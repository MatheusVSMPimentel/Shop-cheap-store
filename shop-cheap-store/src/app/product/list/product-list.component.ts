import { Component } from '@angular/core';
import { Product, ProductDto } from '../models/product';
import { MASKS } from 'ng-brazil';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: ``
})
export class ProductListComponent {

  public products!: Product[];
  errorMessage!: string;
  public MASKS = MASKS

  constructor(private productService: ProductService,
    private spinnerServ: NgxSpinnerService) {
      this.spinnerServ.show()

         }


  ngOnInit(): void {

    this.productService.getAll()
      .subscribe({
        next: products => {

          this.products = products.map((e: ProductDto) => {
          return new Product (e);})

          this.spinnerServ.hide()

        },
        error: error => this.errorMessage
      });
  }
}
