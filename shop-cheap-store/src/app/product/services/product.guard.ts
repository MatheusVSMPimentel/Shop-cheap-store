import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageUtils } from '../../../utils/localstorage';
import { RegisterComponent } from '../../account/register/register.component';
import { ProductRegisterComponent } from '../register/product-register.component';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard implements CanActivate, CanDeactivate<ProductRegisterComponent> {
  public localStorage = new LocalStorageUtils();

  constructor(private router: Router) { }
  canDeactivate(component: ProductRegisterComponent): boolean {
    if(component.changesNotSaved){
      return window.confirm('Changes aren\'t saved, Do you really want to leave?');
    }
    return true;
  }

  canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.localStorage.HasUserLoggedIn()) {
      this.router.navigate(['/account/login'],{queryParams: { returnUrl: this.router.url}});
      return false;
    }

    let user = this.localStorage.getUser();
    let claimData: any = routeAc.data[0]

    if (claimData !== undefined) {
      let claim = routeAc.data[0]['claim']

      if (claim) {

        if (!user.claims) {
          this.unauthorizedAccess();
          return false
        }

        let userClaims = user.claims.find((x: any) => x.type === claim.name);

        if (!userClaims) {
          this.unauthorizedAccess();
          return false
        }

        let claimValues = userClaims.value as string;

        if(!claimValues.includes(claim.value)){
          this.unauthorizedAccess();
        }
      }
    }
    return true;
  }

  unauthorizedAccess() {
    this.router.navigate(['/unauthorized'])
  }
}