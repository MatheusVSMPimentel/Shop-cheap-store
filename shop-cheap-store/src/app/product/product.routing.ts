import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './list/product-list.component';
import { ProductRegisterComponent } from './register/product-register.component';
import { ProductGuard } from './services/product.guard';
import { ProductEditComponent } from './edit/product-edit.component';
import { ProductResolve } from './services/product.resolver';
import { ProductDetailsComponent } from './details/product-details.component';
import { ProductDeleteComponent } from './delete/product-delete.component';
import { ProductAppComponent } from './product.app.component';

const routes: Routes = [{
  path: '', component: ProductAppComponent,
  children: [
    { path: '', redirectTo: '/product/list', pathMatch: 'full' },
    { path: 'list', component: ProductListComponent },
    {
      path: 'register', component: ProductRegisterComponent,
      canActivate: [ProductGuard], canDeactivate:[ProductGuard],
      data: [{ claim: { name: "Produto", value: "Adicionar" } }]
    },
    {
      path: 'edit/:id', component: ProductEditComponent, resolve: {
        product: ProductResolve
      },
      data: [{ claim: { name: "Produto", value: "Atualizar" } }]
    },
    {
      path: 'details/:id', component: ProductDetailsComponent, resolve: {
        product: ProductResolve
      },
    },
    {
      path: 'delete/:id', component: ProductDeleteComponent, resolve: {
        product: ProductResolve
      },
      data: [{claim: {name: "Produto", value: "Excluir"}}]
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
