import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeHu from '@angular/common/locales/hu';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderFormComponent } from './components/check-out/order-form/order-form.component';
import { OrderSummaryComponent } from './components/check-out/order-summary/order-summary.component';
import {
  PaymentAndDeliveryFormComponent,
} from './components/check-out/payment-and-delivery-form/payment-and-delivery-form.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MembershipModule } from './membership/membership.module';
import { OrderDataComponent } from './shared/components/order-list/order-details/order-data/order-data.component';
import { OrderDetailsComponent } from './shared/components/order-list/order-details/order-details.component';
import { OrderListComponent } from './shared/components/order-list/order-list.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { AppErrorHandler } from './utils/errorHandler';

registerLocaleData(localeHu, 'hu');

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    CategoriesComponent,
    OrderSummaryComponent,
    OrderFormComponent,
    OrderDetailsComponent,
    OrderDataComponent,
    PaymentAndDeliveryFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPasswordStrengthModule,
    MatSelectModule,
    MatSortModule,
    MatStepperModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    AngularToastifyModule,
    SharedModule,
    AdminModule,
    MembershipModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        disallowedRoutes: [/\/auth.*/, /\/type.*/, /\/cart.*/],
        allowedDomains: ["localhost:5000"]
      },
    }),
    
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: OrderListComponent, canActivate: [AuthGuard]},
      {path: 'my/orders/order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
    ]),
  ],
  providers: [
    ToastService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
