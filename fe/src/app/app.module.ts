import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

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

import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { AppErrorHandler } from './utils/errorHandler';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './components/admin/admin-products/product-form/product-form.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { ProductCardComponent } from './components/shared/product-card/product-card.component';
import { ProductQuantityComponent } from './components/shared/product-quantity/product-quantity.component';
import { OrderSummaryComponent } from './components/check-out/order-summary/order-summary.component';
import { OrderFormComponent } from './components/check-out/order-form/order-form.component';

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
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProductFormComponent,
    CategoriesComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    OrderSummaryComponent,
    OrderFormComponent,
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
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,

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
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},

      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AdminAuthGuard]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AdminAuthGuard]},
    ]),
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
