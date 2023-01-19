import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DeliveryMethods, PaymentAndDeliveryFormModel, PaymentMethods } from './payment-and-delivery-form-model';

@Component({
  selector: 'payment-and-delivery-form',
  templateUrl: './payment-and-delivery-form.component.html',
  styleUrls: ['./payment-and-delivery-form.component.scss']
})
export class PaymentAndDeliveryFormComponent {
  paymentMethods = PaymentMethods;
  deliveryMethods = DeliveryMethods;
  
  paymentAndDeliveryForm: FormGroup;
  paymentAndDeliveryFormModel: PaymentAndDeliveryFormModel;

  constructor(formBuilder: RxFormBuilder) {
    this.paymentAndDeliveryFormModel = new PaymentAndDeliveryFormModel()
    this.paymentAndDeliveryForm = formBuilder.formGroup(this.paymentAndDeliveryFormModel);
  }

  markAllInputsAsTouched() {
    this.paymentAndDeliveryForm?.markAllAsTouched();
  }

  get controls() {
    return this.paymentAndDeliveryForm?.controls;
  }
}
