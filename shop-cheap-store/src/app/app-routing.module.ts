import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './browsing/home/home.component';
import { NotFoundComponent } from './browsing/not-found/not-found.component';
import { UnauthorizedComponent } from './browsing/unauthorized/unauthorized.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},

    {path: 'home', component: HomeComponent},
    {path: 'account',
      loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {path: 'supplier',
      loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule)
    },

    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
