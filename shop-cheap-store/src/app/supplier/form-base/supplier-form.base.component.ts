import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MASKS, NgxBrazilValidators } from "ngx-brazil";
import { ElementRef } from "@angular/core";
import { FormBaseComponent } from "../../base-components/form-base.component";
import { SupplierService } from "../services/supplier.service";
import { Address, AddressViaCepDto } from "../models/address";
import { DisplayMessage } from "../../../utils/generic-validator";

export abstract class SupplierFormBaseComponent extends FormBaseComponent {
  public MASKS = MASKS
  errors: any[] = [];
  errorsEndereco: any[] = [];
  supplierForm!: FormGroup;
  addressForm!: FormGroup;
  errorMessage!: string;
  documentText = 'Document CNPJ (required)';
  supplierType: FormControl = new FormControl('', [Validators.required]);
  supplierDocument!: FormControl;
  supplierZipCode: FormControl = new FormControl('', [Validators.required, NgxBrazilValidators.cep]);

  constructor(
    protected supplierService: SupplierService,
  ) {
    super();
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

    super.settingUpMessagesValidation(this.validationMessages);

  }

  protected configurateValidationForm(formInputElements: ElementRef[]) {
    super.settingUpFormValidation(formInputElements, [this.supplierForm, this.addressForm]);
    this.observablesOnForm(formInputElements);
  }

  protected observablesOnForm(formInputElements: ElementRef[]) {
    this.supplierType.valueChanges.subscribe(() => {
      this.changeDocumentValidation();
      this.configurateValidationForm(formInputElements);
      this.supplierDocument.setValue(this.supplierDocument.value)
      super.formValidate([this.supplierForm, this.addressForm]);
    });/*
    this.supplierForm.valueChanges.subscribe(() => {
      this.configurateValidationForm(formInputElements);
      super.formValidate([this.supplierForm, this.addressForm]);
    }); */
    this.addressForm?.valueChanges.subscribe(
      () => {
        this.configurateValidationForm(formInputElements);
        super.formValidate([this.supplierForm, this.addressForm]);
      });
  }

  protected changeDocumentValidation() {
    if (this.supplierType.value === '1') {
      this.supplierDocument.clearValidators();
      this.supplierDocument.setValidators([Validators.required, NgxBrazilValidators.cpf]);
      this.documentText = 'Document CPF (required)';
    }
    else {
      this.supplierDocument.clearValidators();
      this.supplierDocument.setValidators([Validators.required, NgxBrazilValidators.cnpj]);
      this.documentText = 'Document CNPJ (required)';
    }
  }


  public searchCep(eventTarget: EventTarget | null) {
    let cep = this.supplierZipCode.value;
    if (cep) {
      this.supplierService.searchCep(cep)
        .subscribe
        ({
          next: (i) => this.setupAddressForm(i),
          error: (e) => this.errors.push(e)
        });
    }
  }

  private setupAddressForm(address: AddressViaCepDto) {
    address.cep = this.supplierZipCode.value
    this.addressForm.patchValue(new Address(undefined, address));
    this.supplierForm.patchValue(new Address(undefined, address));
  }

  /*
    configValidationElements() {
      let controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
      let controlDigits: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'keyup'));


      merge(...controlDigits).subscribe(() => {
        this.formSupplierValidate()
        this.formAddressValidate();

      })

      merge(...controlBlurs).subscribe(() => {
        this.formSupplierValidate()
        this.formAddressValidate();

      })


    }

    formSupplierValidate() {
      this.displayMessage = this.genericValidator.messageProcessing(this.editSupplierForm);
      this.changesSupplierNotSaved = true;
    }

   */

}