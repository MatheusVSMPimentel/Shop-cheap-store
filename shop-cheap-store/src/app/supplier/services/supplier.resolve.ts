import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {  SupplierDto } from '../models/supplier';
import { SupplierService } from './supplier.service';

@Injectable()
export class SupplierResolve implements Resolve<SupplierDto> {

    constructor(private supplierService: SupplierService) { }

    resolve(route: ActivatedRouteSnapshot) {

        return this.supplierService.getById(route.params['id']);
    }
}