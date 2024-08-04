import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Product, ProductDto, SupplierDto } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  product!: Product;
  productUrl = this.urlServiceV1 + "produtos/";
  constructor(private http: HttpClient) {
    super()

  }

  getAll(): Observable<ProductDto[]> {
    return this.http
      .get<ProductDto[]>(this.productUrl, this.getAuthJSONHeader())
      .pipe(catchError(super.serviceError));
  }

  getById(id: string): Observable<ProductDto> {
    return this.http
      .get<ProductDto>(this.productUrl + id, this.getAuthJSONHeader())
      .pipe(catchError(super.serviceError));
  }

  getSuppliers(): Observable<SupplierDto[]> {
    return this.http
      .get<SupplierDto[]>(this.urlServiceV1 + 'fornecedores', this.getAuthJSONHeader())
      .pipe(catchError(super.serviceError));
  }

  registerProduct(product: ProductDto): Observable<ProductDto> {

    return this.http
      .post(this.productUrl, JSON.stringify(product), this.getAuthJSONHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }

  updateProduct(product: ProductDto): Observable<ProductDto> {
    return this.http
      .put(this.productUrl + product.id, JSON.stringify(product), this.getAuthJSONHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }

  deleteProduct(id: string): Observable<ProductDto> {
    return this.http
      .delete<ProductDto>(this.productUrl + id, this.getAuthJSONHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }

}
