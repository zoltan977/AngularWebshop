import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeHu from '@angular/common/locales/hu';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { MembershipModule } from './membership/membership.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { AppErrorHandler } from './utils/errorHandler';

registerLocaleData(localeHu, 'hu');

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    AngularToastifyModule,
    SharedModule,
    AdminModule,
    MembershipModule,
    ShoppingModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        disallowedRoutes: [/\/auth.*/, /\/type.*/, /\/cart.*/],
        allowedDomains: ["localhost:5000"]
      },
    }),
    
    RouterModule.forRoot([]),
  ],
  providers: [
    ToastService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
