import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import setFormErrors from 'src/app/utils/setFormErrors';
import { CredentialsError } from '../../errors/credentialsError';
import { FormError } from '../../errors/formError';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm | undefined;

  constructor(private authService: AuthService) {
  }

  loginClicked() {
    this.loginForm?.control.markAllAsTouched()
  }

  login(formData: any) {
    this.authService.login(formData)
    .subscribe({
      error: (error) => {
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
    })
  }
}
