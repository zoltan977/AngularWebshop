import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.service';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {
  AddUserAccountItemFormComponent,
} from './components/user-account/add-user-account-item-form/add-user-account-item-form.component';
import {
  DisplayUserAccountDataComponent,
} from './components/user-account/display-user-account-data/display-user-account-data.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    UserAccountComponent,
    AddUserAccountItemFormComponent,
    DisplayUserAccountDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'my/account', component: UserAccountComponent, canActivate: [AuthGuard]},
    ])
  ]
})
export class MembershipModule { }
