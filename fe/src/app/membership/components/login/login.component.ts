import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import setFormErrors from 'src/app/shared/utils/setFormErrors';
import { CredentialsError } from '../../../shared/errors/credentialsError';
import { FormError } from '../../../shared/errors/formError';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined;

  constructor(private authService: AuthService) {
  }

  markAllInputsAsTouched() {
    this.loginForm?.control.markAllAsTouched()
  }

  login(formData: any) {
    this.authService.login(formData)
    .subscribe({
      error: this.settingFormErrors
    })
  }

  private settingFormErrors = (error: any) => {
    console.log("login component error:", error)
    if (error instanceof FormError) {
      setFormErrors(error, this.loginForm)
    } else if (error instanceof CredentialsError) {
      this.loginForm?.form.setErrors({
        invalidCredentials: error.originalError.message
      })
    } else {
      throw error;
    }
  }
}
