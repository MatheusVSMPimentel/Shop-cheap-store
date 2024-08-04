import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../../utils/generic-validator';
import { CustomValidators } from 'ngx-custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Supplier, SupplierDto } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';
import { Address, AddressViaCepDto } from '../models/address';
import { NgBrazilValidators, MASKS } from 'ng-brazil';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrl: './supplier-register.component.css'
})
export class SupplierRegisterComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements !: ElementRef[];
  public MASKS = MASKS
  errors: any[] = [];
  registerForm !: FormGroup;
  formResult = '';
  supplier!: Supplier;
  changesNotSaved!: boolean;
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};
  supplierType!: FormControl;
  supplierDocument !: FormControl;
  supplierZipCode !: FormControl;
  documentText = 'Document CNPJ (required)';

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService,
    private router: Router, private toastr: ToastrService) {
    this.validationMessages = {
      name: {
        required: 'The field name is required.',
      },
      document: {
        required: 'The field document is required.',
        cpf: 'Document CPF is invalid.',
        cnpj: 'Document CNPJ is invalid.'
      },
      street: {
        required: 'The field street is required.',
      },
      houseNumber: {
        required: 'The field house number is required.',
      },
      neighborhood: {
        required: 'The field neighborhood is required.',
      },
      zipCode: {
        required: 'The field zipcode is required.',
        cep: 'Zipcode is invalid.'
      },
      city: {
        required: 'The field city is required.',
      },
      state: {
        required: 'The field state is required.',
      }

    };

    this.genericValidator = new GenericValidator(this.validationMessages)
  }

  ngAfterViewInit(): void {
    this.supplierType.valueChanges.subscribe(() => {
      this.changeDocumentValidation();
      this.configValidationElements();
      this.supplierDocument.setValue(this.supplierDocument.value)
      this.formValidate();
    })

    this.configValidationElements()
  }


  ngOnInit(): void {
    this.supplierType = new FormControl('2', [])
    this.supplierDocument = new FormControl('', [Validators.required, NgBrazilValidators.cnpj])
    this.supplierZipCode = new FormControl('', [Validators.required, NgBrazilValidators.cep])
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      document: this.supplierDocument,
      active: ['', [Validators.required]],
      supplierType: this.supplierType,
      address: this.formBuilder.group({
        street: ['', [Validators.required]],
        houseNumber: ['', [Validators.required]],
        additionalAddress: [''],
        neighborhood: ['', [Validators.required]],
        zipCode: this.supplierZipCode,
        city: ['', [Validators.required]],
        state: ['', [Validators.required]]
      })
    });
    this.registerForm.patchValue({ active: true })
  }


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
    this.displayMessage = this.genericValidator.messageProcessing(this.registerForm);
    this.changesNotSaved = true;
  }

  changeDocumentValidation() {
    if (this.supplierType.value === '1') {
      this.supplierDocument.clearValidators();
      this.supplierDocument.setValidators([Validators.required, NgBrazilValidators.cpf]);
      this.documentText = 'Document CPF (required)';

    }
    else {
      this.supplierDocument.clearValidators();
      this.supplierDocument.setValidators([Validators.required, NgBrazilValidators.cnpj]);
      this.documentText = 'Document CNPJ (required)';

    }

  }

  searchCep(eventTarget: EventTarget | null) {
    let cep = this.supplierZipCode.value;
    if(cep){
    this.supplierService.searchCep(cep)
      .subscribe
      ({
        next: (i) => this.setupAddressForm(i),
        error: (e) => this.errors.push(e)
      });
    }
  }

  setupAddressForm(address: AddressViaCepDto) {
    address.cep = this.supplierZipCode.value
    this.registerForm.patchValue({
      address: new Address(undefined, address)
    })
  }

  registerSupplier() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.supplier = Object.assign({}, this.supplier, this.registerForm.value);
      this.supplier.supplierType = this.supplierType.value === '1' ? 1:0;
      this.formResult = JSON.stringify(this.supplier);
      this.supplierService.registerSupplier(new SupplierDto(this.supplier)).subscribe
        ({
          next: (success) => this.successOnRegister(success),
          error: (except) => this.errorOnRegister(except)
        });
    }
  }

  successOnRegister(response: any) {
    this.registerForm.reset();
    this.errors = [];
    this.changesNotSaved = false;

    this.supplierService.localStorage.setLocalUserData(response);
    let toast = this.toastr.success('The Supplier registration has been successful', 'Welcome!! :D')
    if (toast) {
      toast.onHidden.subscribe(() => this.router.navigate(['/supplier/list']))
    }

  }

  errorOnRegister(error: any) {
    this.errors = error.error.errors
    this.toastr.error('An error occurred ', 'Oops :\'(')
  }

}
