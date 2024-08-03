import { Component } from "@angular/core";
import { LocalStorageUtils } from "../../../utils/localstorage";
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent{
  token!: string | null;
  user: any;
  email = "";
  localStorage = new LocalStorageUtils();

  constructor(private router: Router){}

  userLogged(): boolean{
    this.token = this.localStorage.getLocalUserToken();
    this.user = this.localStorage.getUser();
    if(this.user){
      this.email = this.user.email
    }

    return this.token !== null;
  }

  logout(){
    this.localStorage.cleanLocalData();
    this.router.navigate(['/home']);
  }
}