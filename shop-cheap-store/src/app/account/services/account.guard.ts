import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, CanDeactivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot} from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LocalStorageUtils } from '../../../utils/localstorage';

@Injectable()
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate {

  localStorage = new LocalStorageUtils();
constructor(private router: Router){}

  canDeactivate(component: RegisterComponent ): boolean {
    if(component.changesNotSaved){
      return window.confirm('Changes aren\'t saved, Do you really want to leave?');
    }
    return true;
  }

  canActivate():boolean {
    if(this.localStorage.getLocalUserToken()){
      this.router.navigate(['/home']);
    }

    return true
 }
}