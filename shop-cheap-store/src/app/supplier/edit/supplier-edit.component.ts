import { Component, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Supplier, SupplierDto } from '../models/supplier';
import { Address, AddressDto, AddressViaCepDto } from '../models/address';
import { DisplayMessage, GenericValidator, ValidationMessages } from '../../../utils/generic-validator';
import { SupplierService } from '../services/supplier.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { MASKS, NgxBrazilValidators } from 'ngx-brazil';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StringUtils } from '../../../utils/string-util';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBaseComponent } from '../../base-components/form-base.component';
import { SupplierFormBaseComponent } from '../form-base/supplier-form.base.component';


@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrl: './supplier-edit.component.css'
})
export class SupplierEditComponent extends SupplierFormBaseComponent {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  supplier: Supplier = new Supplier();
  address: Address = new Address();
  formResult = '';

  constructor(private fb: FormBuilder,
    supplierService: SupplierService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinnerServ: NgxSpinnerService
  ) {
    super(supplierService);

    this.spinnerServ.show()

    this.supplier = new Supplier(this.route.snapshot.data['supplier']);
    this.supplierDocument = new FormControl('', [Validators.required, this.supplier.supplierType === 1 ? NgxBrazilValidators.cpf : NgxBrazilValidators.cnpj])

    setTimeout(()=>{
      this.spinnerServ.hide();
    },700)
  }

  ngOnInit() {

    this.supplierForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      document: this.supplierDocument,
      active: ['', [Validators.required]],
      supplierType: this.supplierType,
    });

    this.addressForm = this.fb.group({
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
    super.configurateValidationForm(this.formInputElements);
  }

  setupSupplierForm() {
    this.supplierForm.patchValue(this.supplier);
    this.supplierType.setValue(this.supplier.supplierType.toString());
    this.addressForm.patchValue(this.supplier.address);
    this.addressForm.markAsDirty();
    super.formValidate([this.supplierForm,this.addressForm]);
  }

  editSupplier() {
    if (this.supplierForm.dirty && this.supplierForm.valid) {
      this.changesNotSaved = false;

      this.supplier = Object.assign({}, this.supplier, this.supplierForm
        .value);
      this.supplier.supplierType = this.supplierType.value === '1' ? 1 : 0;

      this.supplierService.updateSupplier(new SupplierDto(this.supplier))
        .subscribe({
          next: success => { this.processSuccess(success) },
          error: failure => { this.procesError(failure) }
        });
    }
  }

  updateAddress() {
    if (this.addressForm.dirty && this.addressForm.valid) {
      this.address = Object.assign({}, this.address, this.addressForm.value);
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
    this.changesNotSaved = false;

    if (toast) {
      toast.onHidden.subscribe(() => {
      });
    }
  }

  processSuccess(response: any) {
    this.errors = [];
    let toast = this.toastr.success('Supplier update successfully!', 'Successfully!');
    this.changesNotSaved = false;

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
    super.configurateValidationForm(this.formInputElements);
  }
}
