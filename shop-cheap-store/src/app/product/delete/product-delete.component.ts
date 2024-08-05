import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styles: ``
})
export class ProductDeleteComponent {
  product: Product;

  constructor(private produtoService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.product = new Product( this.route.snapshot.data['product']);
  }

  public eraseProduct() {
    this.produtoService.deleteProduct(this.product.id)
      .subscribe({
      next: evento => { this.successExclusion(evento) },
      error: () => { this.failure() }}
      );
  }

  public successExclusion(evento: any) {

    const toast = this.toastr.success('Product successfully deleted!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/product/list']);
      });
    }
  }

  public failure() {
    this.toastr.error('There was a processing error!', 'Oops! :(');
  }

}
