import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styles: ``
})
export class ProductDetailsComponent {
  product: Product;
  imagens: string = environment.apiImagesUrlv1

  constructor(
    private route: ActivatedRoute,
  ) {

    this.product = new Product( this.route.snapshot.data['product']);
  }
}
