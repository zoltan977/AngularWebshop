import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ToastService } from 'angular-toastify';
import { FormError } from 'src/app/shared/errors/formError';
import { CustomerName, DeliveryAddress, UserAccountFormModel } from 'src/app/membership/models/user-account-model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserAccountService } from 'src/app/membership/services/user-account.service';
import setFormErrors from 'src/app/shared/utils/setFormErrors';

@Component({
  selector: 'add-user-account-item-form',
  templateUrl: './add-user-account-item-form.component.html',
  styleUrls: ['./add-user-account-item-form.component.scss']
})
export class AddUserAccountItemFormComponent implements OnInit {
  userAccountForm!: FormGroup;
  private userAccountFormModel!: UserAccountFormModel;

  constructor(private formBuilder: RxFormBuilder, private userAccountService: UserAccountService, 
    private authService: AuthService, private toastService: ToastService) {}
  
  submit() {
    console.log("userAccountFormModel: ", this.userAccountFormModel);
    this.userAccountService.add(this.userAccountFormModel)
    .subscribe({
      next: () => {
        this.userAccountForm.reset();
        this.toastService.success("A hozzáadás sikerült");
      },
      error: (error) => {
        console.log("userAccount component error:", error)
        if (error instanceof FormError) {
          setFormErrors(error, this.userAccountForm)
        } else {
          throw error;
        }
      }
    })
  }

  addCustomerName() {
    (this.controls.customerNames as FormArray).push(this.formBuilder.formGroup(new CustomerName()))
  }

  addDeliveryAddress() {
    (this.controls.deliveryAddresses as FormArray).push(this.formBuilder.formGroup(new DeliveryAddress()))
  }

  removeCustomerName(index: number) {
    (this.controls.customerNames as FormArray).removeAt(index)
  }

  removeDeliveryAddress(index: number) {
    (this.controls.deliveryAddresses as FormArray).removeAt(index)
  }

  markAllInputsAsTouched() {
    this.userAccountForm?.markAllAsTouched()
  }

  errorsToArray(error: Object | null) {
    return Object.values(error || {}).map(v => v.message || v);
  }

  get controls() {
    return this.userAccountForm.controls
  }

  get customerNames() {
    return (this.controls.customerNames as FormArray<FormGroup>).controls
  }

  get deliveryAddresses() {
    return (this.controls.deliveryAddresses as FormArray<FormGroup>).controls
  }

  get isFormInvalid() {
    return this.userAccountForm.invalid || (!this.customerNames.length && !this.deliveryAddresses.length);
  }

  ngOnInit(): void {
    this.populateForm()
  }

  private populateForm() {
    const customerName = new CustomerName()
    const deliveryAddress = new DeliveryAddress()
    this.userAccountFormModel = new UserAccountFormModel()

    this.userAccountFormModel.customerNames = new Array<CustomerName>()
    this.userAccountFormModel.customerNames.push(customerName)

    this.userAccountFormModel.deliveryAddresses = new Array<DeliveryAddress>()
    this.userAccountFormModel.deliveryAddresses.push(deliveryAddress)

    this.userAccountFormModel.userEmail = this.authService.currentUser?.user.email || "";

    this.userAccountForm = this.formBuilder.formGroup(this.userAccountFormModel);
  }

}
