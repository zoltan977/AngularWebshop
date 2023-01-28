import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductFormComponent } from './components/admin/admin-products/product-form/product-form.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { ProductCardComponent } from './components/shared/product-card/product-card.component';
import { ProductQuantityComponent } from './components/shared/product-quantity/product-quantity.component';
import { OrderSummaryComponent } from './components/check-out/order-summary/order-summary.component';
import { OrderFormComponent } from './components/check-out/order-form/order-form.component';
import { OrderListComponent } from './components/shared/order-list/order-list.component';
import { OrderDetailsComponent } from './components/shared/order-list/order-details/order-details.component';
import { DisplayCartComponent } from './components/shared/display-cart/display-cart.component';
import { OrderDataComponent } from './components/shared/order-list/order-details/order-data/order-data.component';
import { PaymentAndDeliveryFormComponent } from './components/check-out/payment-and-delivery-form/payment-and-delivery-form.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { AddUserAccountItemFormComponent } from './components/user-account/add-user-account-item-form/add-user-account-item-form.component';
import { DisplayUserAccountDataComponent } from './components/user-account/display-user-account-data/display-user-account-data.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { AppErrorHandler } from './utils/errorHandler';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

import localeHu from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';

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
    OrderSuccessComponent,
    AdminProductsComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProductFormComponent,
    CategoriesComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    OrderSummaryComponent,
    OrderFormComponent,
    OrderListComponent,
    OrderDetailsComponent,
    DisplayCartComponent,
    OrderDataComponent,
    PaymentAndDeliveryFormComponent,
    UserAccountComponent,
    AddUserAccountItemFormComponent,
    DisplayUserAccountDataComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatPasswordStrengthModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatBadgeModule,
    MatSortModule,
    MatStepperModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    AngularToastifyModule,

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
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: OrderListComponent, canActivate: [AuthGuard]},
      {path: 'my/orders/order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
      {path: 'my/account', component: UserAccountComponent, canActivate: [AuthGuard]},

      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/orders', component: OrderListComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/orders/order-details/:id', component: OrderDetailsComponent, canActivate: [AdminAuthGuard]},
    ]),
  ],
  providers: [
    ToastService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
