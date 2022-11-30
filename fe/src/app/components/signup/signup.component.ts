import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
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

  signUp(formData: any) {
    this.authService.signUp(formData)
    .subscribe({
      error: (error) => {
        console.log("signup component error:", error)
        if (error instanceof FormError) {
          error.originalError.forEach((e: any) => {
            e.constraints.forEach((c: Object) => {
              this.signUpForm?.controls[e.property].setErrors(c)
            });
          });
        } else {
          throw error;
        }
      }
    })
  }
}
