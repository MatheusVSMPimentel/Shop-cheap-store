import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "../../services/base.service";
import { Supplier, SupplierDto } from "../models/supplier";
import { AddressDto, AddressViaCepDto } from "../models/address";


@Injectable()
export class SupplierService extends BaseService {

  supplier: Supplier = new Supplier();

    constructor(private http: HttpClient) { super()

        this.supplier.name = "Teste Fake"
        this.supplier.document = "32165498754"
        this.supplier.active = true
        this.supplier.supplierType = 1
    }

    getAll(): Observable<SupplierDto[]> {
        return this.http
            .get<SupplierDto[]>(this.urlServiceV1 + "fornecedores")
            .pipe(catchError(super.serviceError));
    }

    getById(id: string): Observable<SupplierDto> {
      return this.http
      .get<SupplierDto>(this.urlServiceV1 + `fornecedores/${id}`, this.getAuthJSONHeader())
      .pipe(catchError(super.serviceError));
    }

    registerSupplier(supplier: SupplierDto): Observable<SupplierDto> {

      return this.http
      .post(this.urlServiceV1 + "fornecedores", JSON.stringify(supplier), this.getAuthJSONHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
    }

    updateSupplier(supplier: SupplierDto): Observable<SupplierDto> {
      return this.http
      .put(this.urlServiceV1 + `fornecedores/${supplier.id}`, JSON.stringify(supplier), this.getAuthJSONHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
    }

    updateAddress(address: AddressDto): Observable<AddressDto> {
      return this.http
      .put<SupplierDto>(this.urlServiceV1 + `fornecedores/endereco/${address.id}`, JSON.stringify(address), this.getAuthJSONHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
    }

    deleteSupplier(id: string): Observable<Supplier> {
      return this.http
      .delete<SupplierDto>(this.urlServiceV1 + `fornecedores/${id}`,  this.getAuthJSONHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
    }

    searchCep(cep:string): Observable<AddressViaCepDto>{
      return this.http
            .get<AddressViaCepDto>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(catchError(super.serviceError));
    }
}
