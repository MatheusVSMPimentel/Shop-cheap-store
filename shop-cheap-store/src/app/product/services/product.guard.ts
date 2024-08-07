import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router } from '@angular/router';
import { ProductRegisterComponent } from '../register/product-register.component';
import { BaseGuard } from '../../services/base.guard';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard extends BaseGuard implements CanActivate, CanDeactivate<ProductRegisterComponent> {

  constructor(router: Router) {
    super(router)
   }
  canDeactivate(component: ProductRegisterComponent): boolean {
    if(component.changesNotSaved){
      return window.confirm('Changes aren\'t saved, Do you really want to leave?');
    }
    return true;
  }

  canActivate(routeAc: ActivatedRouteSnapshot): boolean {
    return super.validClaims(routeAc)
  }
}