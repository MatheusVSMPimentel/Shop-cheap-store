import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AccountAppComponent } from './account.app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountGuard } from './services/account.guard';


const routes: Routes = [
  { path: '', component: AccountAppComponent, children: [
    {path: 'register', component: RegisterComponent, canDeactivate:[AccountGuard], canActivate: [AccountGuard]},
    {path: 'login', component: LoginComponent, canActivate: [AccountGuard]}
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
