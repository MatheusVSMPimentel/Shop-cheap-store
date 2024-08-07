import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Supplier, SupplierDto } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';
import { Address, AddressViaCepDto } from '../models/address';
import { MASKS, NgxBrazilValidators } from 'ngx-brazil';
import { FormBaseComponent } from '../../base-components/form-base.component';
import { SupplierFormBaseComponent } from '../form-base/supplier-form.base.component';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrl: './supplier-register.component.css'
})
export class SupplierRegisterComponent extends SupplierFormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements !: ElementRef[];
  formResult = '';
  supplier!: Supplier;

  constructor(private formBuilder: FormBuilder, supplierService: SupplierService,
    private router: Router, private toastr: ToastrService) {
    super(supplierService);

  }

  ngAfterViewInit(): void {
    super.configurateValidationForm(this.formInputElements)
  }


  ngOnInit(): void {
    this.supplierType = new FormControl('2', [])
    this.supplierDocument = new FormControl('', [Validators.required, NgxBrazilValidators.cnpj])
    this.supplierZipCode = new FormControl('', [Validators.required, NgxBrazilValidators.cep])
    this.supplierForm = this.formBuilder.group({
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
    this.supplierForm.patchValue({ active: true })
  }

  registerSupplier() {
    if (this.supplierForm.dirty && this.supplierForm.valid) {
      this.supplier = Object.assign({}, this.supplier, this.supplierForm.value);
      this.supplier.supplierType = this.supplierType.value === '1' ? 1 : 0;
      this.formResult = JSON.stringify(this.supplier);
      this.supplierService.registerSupplier(new SupplierDto(this.supplier)).subscribe
        ({
          next: (success) => this.successOnRegister(success),
          error: (except) => this.errorOnRegister(except)
        });
    }
  }

  successOnRegister(response: any) {
    this.supplierForm.reset();
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
