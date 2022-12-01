import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import setFormErrors from 'src/app/utils/setFormErrors';
import { FormError } from '../../errors/formError';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('signUpForm') signUpForm: NgForm | undefined;

  constructor(private authService: AuthService) {
  }

  confirmPasswordKeyDownHandler() {
    this.signUpForm?.controls['confirmPassword'].markAsTouched({onlySelf: true})
  }

  signUpClicked() {
    this.signUpForm?.control.markAllAsTouched()
  }

  signUp(formData: any) {
    this.authService.signUp(formData)
    .subscribe({
      error: (error) => {
        console.log("signup component error:", error)
        if (error instanceof FormError) {
          setFormErrors(error, this.signUpForm)
        } else {
          throw error;
        }
      }
    })
  }
}
