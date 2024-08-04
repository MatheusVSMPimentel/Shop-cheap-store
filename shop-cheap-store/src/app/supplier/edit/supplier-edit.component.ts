import { Component, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Supplier, SupplierDto } from '../models/supplier';
import { Address, AddressDto, AddressViaCepDto } from '../models/address';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../../utils/generic-validator';
import { SupplierService } from '../services/supplier.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StringUtils } from '../../../utils/string-util';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrl: './supplier-edit.component.css'
})
export class SupplierEditComponent {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
  errors: any[] = [];
  errorsEndereco: any[] = [];
  editSupplierForm!: FormGroup;
  editAddressForm!: FormGroup;
  supplier: Supplier = new Supplier();
  address: Address = new Address();
  public MASKS = MASKS
  formResult = '';
  changesSupplierNotSaved!: boolean;
  changesAddressNotSaved!: boolean;
  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};
  displayAddressMessage: DisplayMessage = {};
  supplierType: FormControl = new FormControl('');
  supplierDocument!: FormControl;
  supplierZipCode: FormControl = new FormControl('', [Validators.required, NgBrazilValidators.cep]);
  documentText = 'Document CNPJ (required)';

  constructor(private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinnerServ: NgxSpinnerService
  ) {
    this.spinnerServ.show()
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

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.supplier = new Supplier(this.route.snapshot.data['supplier']);
    this.supplierDocument = new FormControl('', [Validators.required, this.supplier.supplierType === 1 ? NgBrazilValidators.cpf : NgBrazilValidators.cnpj])

    setTimeout(()=>{
      this.spinnerServ.hide();
    },700)
  }

  ngOnInit() {

    this.editSupplierForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      document: this.supplierDocument,
      active: ['', [Validators.required]],
      supplierType: this.supplierType,
    });

    this.editAddressForm = this.fb.group({
      id: '',
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      additionalAddress: [''],
      neighborhood: ['', [Validators.required]],
      zipCode: this.supplierZipCode,
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      fornecedorId: ''
    });
    this.setupSupplierForm();
  }

  ngAfterViewInit() {
    this.supplierType.valueChanges.subscribe(() => {
      this.changeDocumentValidation();
      this.configValidationElements();
      this.supplierDocument.setValue(this.supplierDocument.value)
      this.formSupplierValidate();
    });
    this.editAddressForm.valueChanges.subscribe(
    () => {
      this.configValidationElements();
      this.formAddressValidate();
    });
    this.configValidationElements();
  }

  setupSupplierForm() {
    this.editSupplierForm.patchValue(this.supplier);
    this.supplierType.setValue(this.supplier.supplierType.toString());
    this.editAddressForm.patchValue(this.supplier.address);
    this.editAddressForm.markAsDirty();
    this.formSupplierValidate();
    this.formAddressValidate();
  }

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

  formAddressValidate() {
    this.displayAddressMessage = this.genericValidator.messageProcessing(this.editAddressForm);
    this.changesAddressNotSaved = true;
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
    if (cep) {
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
    this.editAddressForm.patchValue( new Address(undefined, address)
    )
  }

  editSupplier() {
    if (this.editSupplierForm.dirty && this.editSupplierForm.valid) {
      this.changesSupplierNotSaved = false;

      this.supplier = Object.assign({}, this.supplier, this.editSupplierForm
        .value);
      this.supplier.supplierType = this.supplierType.value === '1' ? 1 : 0;

      this.supplierService.updateSupplier(new SupplierDto(this.supplier))
        .subscribe({
          next: success => { this.processSuccess(success) },
          error: failure => { this.procesError(failure) }
        }
        );
    }
  }

  updateAddress() {
    if (this.editAddressForm.dirty && this.editAddressForm.valid) {
      this.address = Object.assign({}, this.address, this.editAddressForm.value);
        this.address.zipCode = StringUtils.onlyNumbers(this.address.zipCode);
        this.address.supplierId = this.supplier.id;
      this.supplierService.updateAddress(new AddressDto(this.address))
        .subscribe({
          next: success => { this.processAddressUpdateSuccess(success);  },
          error: faluire => { this.procesError(faluire) }
        }
        );

    }
  }

  processAddressUpdateSuccess(response: AddressDto) {
    this.errors = [];
    let toast = this.toastr.success('Supplier update successfully!', 'Successfully!');
    this.supplier.address = new Address(response);
    this.modalService.dismissAll();
    this.changesAddressNotSaved = false;

    if (toast) {
      toast.onHidden.subscribe(() => {
      });
    }
  }

  processSuccess(response: any) {
    this.errors = [];
    let toast = this.toastr.success('Supplier update successfully!', 'Successfully!');
    this.changesSupplierNotSaved = false;

    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/supplier/list']);
        this.modalService.dismissAll();
      });
    }
  }

  procesError(fail: any) {

    this.errors = fail.error.errors;
    this.toastr.error('An error occurred ', 'Oops :\'(');
  }

  openModal(content:any){
    this.modalService.open(content);
    this.configValidationElements();
  }
}
