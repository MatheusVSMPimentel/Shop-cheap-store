import { Component } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from '../models/supplier';
import { DomSanitizer } from '@angular/platform-browser';
import { MASKS } from 'ngx-brazil';

@Component({
  selector: 'app-supplier-delete',
  templateUrl: './supplier-delete.component.html',
  styleUrl: './supplier-delete.component.css'
})
export class SupplierDeleteComponent {
  supplier: Supplier = new Supplier();
  addressMap: any;
  public MASKS = MASKS
  errors: any[] = [];

  constructor(
    private fornecedorService: SupplierService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) {
    this.supplier = new Supplier (this.route.snapshot.data['supplier']);
    this.addressMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q="+this.fullAddressToString()+"&key=AIzaSyD4iE2xVSpkLLOXoyqT-RuPwURN3ddScAI");

     }


  deleteSupplier() {
    if(window.confirm('Are you sure you want to exclude the supplier?')){
    this.fornecedorService.deleteSupplier(this.supplier.id)
      .subscribe({
       next: response => { this.successfullyDelete(response) },
       error: error => { this.failedDelete(error) }}
      );
    }
  }

  successfullyDelete(response: any) {

    const toast = this.toastr.success('Supplier delete successfully!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/supplier/list']);
      });
    }
  }

  failedDelete(fail: any) {
    this.errors = fail.error.errors

    this.toastr.error('An error occurred ', 'Oops :\'(');
  }

  fullAddressToString(): string{

    return `${this.supplier.address.street}, ${this.supplier.address.houseNumber} - ${this.supplier.address.neighborhood}, ${this.supplier.address.city} - ${this.supplier.address.state}`
  }
}
