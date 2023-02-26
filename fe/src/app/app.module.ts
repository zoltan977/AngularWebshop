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

import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/admin-products/product-form/product-form.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderFormComponent } from './components/check-out/order-form/order-form.component';
import { OrderSummaryComponent } from './components/check-out/order-summary/order-summary.component';
import {
  PaymentAndDeliveryFormComponent,
} from './components/check-out/payment-and-delivery-form/payment-and-delivery-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SignupComponent } from './components/signup/signup.component';
import {
  AddUserAccountItemFormComponent,
} from './components/user-account/add-user-account-item-form/add-user-account-item-form.component';
import {
  DisplayUserAccountDataComponent,
} from './components/user-account/display-user-account-data/display-user-account-data.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
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
    LoginComponent,
    SignupComponent,
    CategoriesComponent,
    OrderSummaryComponent,
    OrderFormComponent,
    OrderDetailsComponent,
    OrderDataComponent,
    PaymentAndDeliveryFormComponent,
    UserAccountComponent,
    AddUserAccountItemFormComponent,
    DisplayUserAccountDataComponent,
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
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},

      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: OrderListComponent, canActivate: [AuthGuard]},
      {path: 'my/orders/order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
      {path: 'my/account', component: UserAccountComponent, canActivate: [AuthGuard]},
    ]),
  ],
  providers: [
    ToastService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
