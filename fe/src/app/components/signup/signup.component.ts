import { Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import setFormErrors from 'src/app/utils/setFormErrors';
import { FormError } from '../../errors/formError';
import { AuthService } from '../../services/auth.service';
import { SignUpFormModel } from './signupFormModel';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  signUpFormModel!: SignUpFormModel

  constructor(private authService: AuthService, private formBuilder: RxFormBuilder) {
  }

  get controls() {
    return this.signUpForm.controls
  }
  
  ngOnInit(): void {
    this.signUpFormModel = new SignUpFormModel();
    this.signUpForm = this.formBuilder.formGroup(this.signUpFormModel);
  }

  markConfirmPasswordAsTouched() {
    this.signUpForm?.controls['confirmPassword'].markAsTouched({onlySelf: true})
  }

  markAllInputsAsTouched() {
    this.signUpForm?.markAllAsTouched()
  }

  signUp() {
    this.authService.signUp(this.signUpFormModel)
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
