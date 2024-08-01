import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";
import { MenuLoginComponent } from "./menu-login/menu-login.component";

@NgModule({
  declarations:[
    MenuComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,
    MenuLoginComponent
  ],
  imports:[
    CommonModule, RouterModule, NgbCollapse
  ],
  exports:[
    MenuComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent],
    providers: [Router]
})
export class BrowsingModule{}
