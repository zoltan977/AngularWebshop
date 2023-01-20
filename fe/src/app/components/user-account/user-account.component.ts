import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { CustomerName, DeliveryAddress, UserAccountFormModel } from './user-account-form-model';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  userAccountForm!: FormGroup;
  userAccountFormModel!: UserAccountFormModel;

  constructor(private formBuilder: RxFormBuilder) {}

  ngOnInit(): void {
    const customerName = new CustomerName()
    const deliveryAddress = new DeliveryAddress()
    this.userAccountFormModel = new UserAccountFormModel()

    this.userAccountFormModel.customerNames = new Array<CustomerName>()
    this.userAccountFormModel.customerNames.push(customerName)

    this.userAccountFormModel.deliveryAddresses = new Array<DeliveryAddress>()
    this.userAccountFormModel.deliveryAddresses.push(deliveryAddress)

    this.userAccountForm = this.formBuilder.formGroup(this.userAccountFormModel)
  }

  submit() {
    console.log("userAccountFormModel: ", this.userAccountFormModel)
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

  get controls() {
    return this.userAccountForm.controls
  }

  get customerNames() {
    return (this.controls.customerNames as FormArray).controls as FormGroup[]
  }

  get deliveryAddresses() {
    return (this.controls.deliveryAddresses as FormArray).controls as FormGroup[]
  }

}
