import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router,  } from '@angular/router';
import { RegisterComponent } from '../../account/register/register.component';
import { BaseGuard } from '../../services/base.guard';

@Injectable({
  providedIn: 'root'
})
export class SupplierGuard extends BaseGuard implements CanActivate, CanDeactivate<RegisterComponent> {

  constructor(router: Router) {
    super(router)
   }
  canDeactivate(component: RegisterComponent): boolean {
    if(component.changesNotSaved){
      return window.confirm('Changes aren\'t saved, Do you really want to leave?');
    }
    return true;
  }

  canActivate(routeAc: ActivatedRouteSnapshot): boolean {
    return super.validClaims(routeAc)
  }


}