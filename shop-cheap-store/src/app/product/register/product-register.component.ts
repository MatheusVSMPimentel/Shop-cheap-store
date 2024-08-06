import { Component, ElementRef, ViewChildren } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MASKS } from 'ngx-brazil';
import { ToastrService } from 'ngx-toastr';
import { Observable, fromEvent, map, merge } from 'rxjs';
import { ValidationMessages, GenericValidator, DisplayMessage } from '../../../utils/generic-validator';
import { Product, Supplier, ProductDto } from '../models/product';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage, Dimensions } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedSettings } from '../models/imageCropSettings';
import { StringUtils } from '../../../utils/string-util';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styles: ``
})
export class ProductRegisterComponent {

  @ViewChildren
    (FormControlName, { read: ElementRef }) formInputElements !: ElementRef[];
  public MASKS = MASKS
  errors: any[] = [];
  productForm !: FormGroup;
  formResult = '';
  product!: Product;
  suppliers!: Supplier[];
  changesNotSaved!: boolean;
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};
  errorMessage!: string;

  cropperSettings: ImageCroppedSettings = new ImageCroppedSettings();

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router, private toastr: ToastrService, private spinnerServ: NgxSpinnerService,
    private sanitizer: DomSanitizer) {

    this.spinnerServ.show()

    this.validationMessages = {
      supplierId: {
        required: 'Choose a supplier.',
      },
      name: {
        required: 'Enter the product name.',
        minlength: 'Minimum 2 characters.',
        maxlength: 'Maximum 200 characters.'
      },
      description: {
        required: 'Informe a Descrição',
        minlength: 'Minimum 2 characters',
        maxlength: 'Maximum 1000 characters.'
      },
      image: {
        required: 'Insert an Image.',
      },
      value: {
        required: 'Insert an amount',
      }

    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  //angular
  ngOnInit(): void {

    this.productService.getSuppliers()
      .pipe(map(suppliers => suppliers.map(e => new Supplier(e))))
      .subscribe({
        next: suppliers => {
          this.suppliers = suppliers
          this.spinnerServ.hide()
        },
        error: error => this.errorMessage
      });

    this.productForm = this.formBuilder.group({
      supplierId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      image: ['', [Validators.required]],
      value: ['', [Validators.required]],
      active: [0]
    });

  }

  ngAfterViewInit() {
    this.configValidationElements();
  }

  //display function
  configValidationElements() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    let controlDigits: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'keyup'));

    merge(...controlDigits).subscribe(() => {
      this.formValidate()
    })

    merge(...controlBlurs).subscribe(() => {
      this.formValidate()
    })
  }

  formValidate() {
    this.displayMessage = this.genericValidator.messageProcessing(this.productForm);
    this.changesNotSaved = true;
  }
  //service
  createProduct() {
    if (this.productForm.dirty && this.productForm.valid) {
      this.changesNotSaved = false;

      this.product = Object.assign({}, this.product, this.productForm
        .value);
      this.product.imageUpload = this.cropperSettings.croppedImage.split(',')[1];
      let imageNameArray = this.cropperSettings.imageName.split('.');
      this.product.image = this.cropperSettings.imageName.substring(0,20)+'.'+imageNameArray[imageNameArray.length -1];
      this.product.value = StringUtils.convertToNumber(this.productForm.get('value')?.value);
      console.log(this.product);
      this.productService.registerProduct(new ProductDto(this.product))
        .subscribe({
          next: success => { this.processSuccess(success) },
          error: failure => { this.procesError(failure) }
        }
        );

    }
  }

  processSuccess(response: any) {
    this.errors = [];
    let toast = this.toastr.success('product inserted successfully!', 'Successfully!');
    this.changesNotSaved = false;

    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/product/list']);
      });
    }
  }

  procesError(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('An error occurred ', 'Oops :\'(');
  }


  //image-cropper
  fileChangeEvent(event: any): void {
    this.cropperSettings.imageChangedEvent = event;
    let target: HTMLInputElement = event.target; // Aqui usamos 'target' em vez de 'currentTarget'
    if (target && target.files) {
      this.cropperSettings.imageName = target.files[0].name;

    }
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl)
      this.cropperSettings.imageUrl = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    this.cropperSettings.croppedImage = event.base64;
  }
  imageLoaded() {
    this.cropperSettings.showCropper = true
  }
  cropperReady(sourceImageDimension: Dimensions) {
    console.log('Cropper ready', sourceImageDimension)
  }
  loadImageFailed() {
    this.errors.push(`The ${this.cropperSettings.imageName} file format isn\'t valid.`)
  }
}
