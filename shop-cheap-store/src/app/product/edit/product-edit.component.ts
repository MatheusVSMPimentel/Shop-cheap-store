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

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styles: ``
})
export class ProductEditComponent implements OnInit, AfterViewInit {
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

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router, private toastr: ToastrService, private spinnerServ: NgxSpinnerService) {

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
      imagem: [''],
      value: ['', [Validators.required]],
      active: [0]
    });

    this.productForm.patchValue({
      supplierId: this.product.supplierId,
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      active: this.product.active,
      value: this.product.value
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

      this.product = Object.assign({}, this.product, this.productForm
        .value);

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
    let toast = this.toastr.success('Supplier update successfully!', 'Successfully!');
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
}
