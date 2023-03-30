import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderFormComponent } from './components/check-out/order-form/order-form.component';
import { OrderSummaryComponent } from './components/check-out/order-summary/order-summary.component';
import { PaymentAndDeliveryFormComponent } from './components/check-out/payment-and-delivery-form/payment-and-delivery-form.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { OrderListComponent } from '../shared/components/order-list/order-list.component';
import { OrderDetailsComponent } from '../shared/components/order-list/order-details/order-details.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [
    CheckOutComponent,
    OrderFormComponent,
    OrderSummaryComponent,
    PaymentAndDeliveryFormComponent,
    ProductsComponent,
    CategoriesComponent,
    ShoppingCartComponent
  ],
  imports: [
    MatStepperModule,
    MatRadioModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: OrderListComponent, canActivate: [AuthGuard]},
      {path: 'my/orders/order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
    ])
  ]
})
export class ShoppingModule { }
