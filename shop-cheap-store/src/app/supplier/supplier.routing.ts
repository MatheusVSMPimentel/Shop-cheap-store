import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SupplierAppComponent } from './supplier.app.component';
import { SupplierListComponent } from './list/supplier-list.component';
import { SupplierRegisterComponent } from './register/supplier-register.component';
import { SupplierEditComponent } from './edit/supplier-edit.component';
import { SupplierDetailsComponent } from './details/supplier-details.component';
import { SupplierDeleteComponent } from './delete/supplier-delete.component';
import { SupplierResolve } from './services/supplier.resolve';
import { SupplierGuard } from './services/supplier.guard';
const routes: Routes = [{
  path: '', component: SupplierAppComponent,
  children: [
    { path: '', redirectTo: '/supplier/list', pathMatch: 'full' },
    { path: 'list', component: SupplierListComponent },
    {
      path: 'register', component: SupplierRegisterComponent,
      canActivate: [SupplierGuard], canDeactivate:[SupplierGuard],
      data: [{ claim: { name: "Fornecedor", value: "Adicionar" } }]
    },
    {
      path: 'edit/:id', component: SupplierEditComponent, resolve: {
        supplier: SupplierResolve
      },
      data: [{ claim: { name: "Fornecedor", value: "Atualizar" } }]
    },
    {
      path: 'details/:id', component: SupplierDetailsComponent, resolve: {
        supplier: SupplierResolve
      },
    },
    {
      path: 'delete/:id', component: SupplierDeleteComponent, resolve: {
        supplier: SupplierResolve
      },
      data: [{claim: {name: "Fornecedor", value: "Excluir"}}]
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
