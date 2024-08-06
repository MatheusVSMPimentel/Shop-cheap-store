import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../product/models/product';

@Component({
  selector: 'app-products-supplier-list',
  templateUrl: './products-supplier-list.component.html',
  styleUrls: []
})
export class ProductsSupplierListComponent {
  images: string = environment.apiImagesUrlv1;

  @Input()
  products!: Product[];
}
