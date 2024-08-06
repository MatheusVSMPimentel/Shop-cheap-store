import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRegisterComponent } from './register/product-register.component';
import { ProductListComponent } from './list/product-list.component';
import { ProductDetailsComponent } from './details/product-details.component';
import { ProductEditComponent } from './edit/product-edit.component';
import { ProductDeleteComponent } from './delete/product-delete.component';
import { ProductRoutingModule } from './product.routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SupplierRoutingModule } from '../supplier/supplier.routing';
import { ProductGuard } from './services/product.guard';
import { ProductResolve } from './services/product.resolver';
import { ProductService } from './services/product.service';
import { ProductAppComponent } from './product.app.component';
import { NgxBrazil } from 'ngx-brazil';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, IConfig } from 'ngx-mask';
import { TextMaskModule } from 'angular-ngx-textmask';
import { ImageCropperComponent } from 'ngx-image-cropper';
export const maskConfig: Partial<IConfig> = { };


@NgModule({
  declarations: [
    ProductAppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    ProductRegisterComponent,
  ],
  imports: [
    ProductRoutingModule,
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, SupplierRoutingModule,
    NgxBrazil , NgxMaskDirective , NgxMaskPipe, NgxSpinnerModule, TextMaskModule,
    ImageCropperComponent
  ],
  providers: [ProductService, provideNgxMask(), ProductResolve, ProductGuard]
})
export class ProductModule { }
