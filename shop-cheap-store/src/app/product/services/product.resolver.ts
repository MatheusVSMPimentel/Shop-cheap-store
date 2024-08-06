import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductDto } from '../models/product';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolve implements Resolve<ProductDto> {

    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.productService.getById(route.params['id']);
    }
}