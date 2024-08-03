import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './browsing/home/home.component';
import { NotFoundComponent } from './browsing/not-found/not-found.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},

    {path: 'home', component: HomeComponent},
    {path: 'account',
      loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {path: '**', component: NotFoundComponent},

    {path: 'not-found', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
