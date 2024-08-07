import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierAppComponent } from './supplier.app.component';
import { RouterModule } from '@angular/router';
import { SupplierRegisterComponent } from './register/supplier-register.component';
import { SupplierListComponent } from './list/supplier-list.component';
import { SupplierDeleteComponent } from './delete/supplier-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierEditComponent } from './edit/supplier-edit.component';
import { SupplierDetailsComponent } from './details/supplier-details.component';
import { SupplierRoutingModule } from './supplier.routing';
import { SupplierService } from './services/supplier.service';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SupplierResolve } from './services/supplier.resolve';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SupplierGuard } from './services/supplier.guard';
import { NgxBrazil } from 'ngx-brazil';
import { ProductsSupplierListComponent } from './products/products-supplier-list.component';

@NgModule({
  declarations: [SupplierAppComponent, SupplierRegisterComponent, SupplierListComponent, SupplierDeleteComponent, SupplierEditComponent, SupplierDetailsComponent, ProductsSupplierListComponent],
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, SupplierRoutingModule,
    NgxBrazil, NgxMaskDirective, NgxMaskPipe, NgxSpinnerModule,
  ],
  providers: [SupplierService, provideNgxMask(), SupplierResolve, SupplierGuard]


})
export class SupplierModule { }