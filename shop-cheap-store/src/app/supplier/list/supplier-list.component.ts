import { Component } from '@angular/core';
import { Supplier, SupplierDto } from '../models/supplier';
import { SupplierService } from '../services/supplier.service';
import { MASKS } from 'ng-brazil';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent {
  public suppliers!: Supplier[];
  errorMessage!: string;
  public MASKS = MASKS

  constructor(private supplierService: SupplierService,
    private spinnerServ: NgxSpinnerService) {
    this.spinnerServ.show()

  }


  ngOnInit(): void {

    this.supplierService.getAll()
      .pipe(map(suppliers => suppliers.map(e => new Supplier(e))))
      .subscribe({
        next: suppliers => {
          this.suppliers = suppliers
          this.spinnerServ.hide()
        },
        error: error => this.errorMessage
      });
  }
}
