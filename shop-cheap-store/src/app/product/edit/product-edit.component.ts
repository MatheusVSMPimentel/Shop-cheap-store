import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, map, merge, Observable } from 'rxjs';
import { Product, ProductDto, Supplier } from '../models/product';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../../utils/generic-validator';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MASKS } from 'ngx-brazil';
import { StringUtils } from '../../../utils/string-util';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCroppedSettings } from '../models/imageCropSettings';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styles: ``
})
export class ProductEditComponent implements OnInit, AfterViewInit {
  images: string = environment.apiImagesUrlv1

  @ViewChildren
    (FormControlName, { read: ElementRef }) formInputElements !: ElementRef[];
  public MASKS = MASKS;
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
  imgProperties: ImageCroppedSettings = new ImageCroppedSettings();
  currentlyImageSrc !: string;

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

    this.product = new Product(this.route.snapshot.data['product']);
    this.imgProperties.imageName = this.product.image;
    this.currentlyImageSrc = this.images + this.product.image;
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
      image: [''],
      value: [0, [Validators.required]],
      active: [0]
    });

    this.productForm.patchValue({
      supplierId: this.product.supplierId,
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      active: this.product.active,
      value: StringUtils.DecimalToString( this.product.value)
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
  editProduct() {
    if (this.productForm.dirty && this.productForm.valid) {
      this.changesNotSaved = false;

      this.product = Object.assign({}, this.product, this.productForm.value);
      console.log(this.imgProperties.croppedImage)
      if (this.imgProperties.croppedImage) {
        this.product.imageUpload = this.imgProperties.croppedImage;
        let imageNameArray = this.imgProperties.imageName.split('.');
        this.product.image = imageNameArray.length > 20?
         this.imgProperties.imageName.substring(0, 20) + '.' + imageNameArray[imageNameArray.length - 1]:
         this.imgProperties.imageName;

      }

      this.product.value = StringUtils.convertToNumber(this.productForm.get('value')?.value + "");
      console.log(this.product);
      this.productService.updateProduct(new ProductDto(this.product))
        .subscribe({
          next: success => { this.processSuccess(success) },
          error: failure => { this.procesError(failure) }
        }
        );

    }
  }

  processSuccess(response: any) {
    this.errors = [];
    let toast = this.toastr.success('Product update successfully!', 'Successfully!');
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

  //image manipulation
  upload(file: any) {
    this.imgProperties.imageName = file[0].name;

    var reader = new FileReader();
    reader.onload = this.readerProcessflow.bind(this);
    reader.readAsBinaryString(file[0])
  }

  readerProcessflow(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imgProperties.croppedImage = btoa(binaryString);
    this.imgProperties.imageUrl = "data:image/jpeg;base64," + this.imgProperties.croppedImage
  }
}
