import { Component } from '@angular/core';
import { Supplier } from '../models/supplier';
import { ActivatedRoute, Params } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MASKS } from 'ng-brazil';


@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrl: './supplier-details.component.css'
})
export class SupplierDetailsComponent {

  supplier: Supplier = new Supplier();
  addressMap: any;
  public MASKS = MASKS

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private sanitizer: DomSanitizer
  ) {
      this.supplier = new Supplier (this.route.snapshot.data['supplier']);

      this.addressMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q="+this.fullAddressToString()+"&key=AIzaSyD4iE2xVSpkLLOXoyqT-RuPwURN3ddScAI");
  }

  fullAddressToString(): string{

    return `${this.supplier.address.street}, ${this.supplier.address.houseNumber} - ${this.supplier.address.neighborhood}, ${this.supplier.address.city} - ${this.supplier.address.state}`
  }
}
