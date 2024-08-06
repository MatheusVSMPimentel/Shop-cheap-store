import { Component } from '@angular/core';
import { Product, ProductDto } from '../models/product';
import { MASKS } from 'ngx-brazil';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: ``
})
export class ProductListComponent {

  public products!: Product[];
  errorMessage!: string;
  public MASKS = MASKS
  images: string = environment.apiImagesUrlv1
  currentlyImageSrc !: string;

  constructor(private productService: ProductService,
    private spinnerServ: NgxSpinnerService) {
      this.spinnerServ.show()

         }


  ngOnInit(): void {

    this.productService.getAll()
      .pipe(map(products => products.map(e => new Product(e))))
      .subscribe({
        next: products => {
          this.products = products
          this.spinnerServ.hide()
        },
        error: error => this.errorMessage
      });

  }
}
