import { NgModule } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterOutlet } from '@angular/router';
import { AccountAppComponent } from './account.app.component';
import { AccountRoutingModule } from './account.routing';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './services/account.service';
import { CustomFormsModule } from 'ngx-custom-validators';
import { AccountGuard } from './services/account.guard';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AccountAppComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AccountRoutingModule,
    NgIf, NgClass, NgFor,
  ],
  providers: [
    AccountService,
    CustomFormsModule,
    Validators,
    AccountGuard
  ]
})
export class AccountModule { }
