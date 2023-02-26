import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/admin-products/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { OrderListComponent } from '../shared/components/order-list/order-list.component';
import { OrderDetailsComponent } from '../shared/components/order-list/order-details/order-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AdminProductsComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSelectModule,
    RouterModule.forChild([
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products/product-details/new', component: ProductFormComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products/product-details/:id', component: ProductFormComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/orders', component: OrderListComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/orders/order-details/:id', component: OrderDetailsComponent, canActivate: [AdminAuthGuard]},
    ])
  ]
})
export class AdminModule { }
