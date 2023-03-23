import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { CheckoutFormsValuesService } from 'src/app/shopping/services/checkout-forms-values.service';
import { DeliveryMethods, PaymentAndDeliveryFormModel, PaymentMethods } from '../../../models/payment-and-delivery-model';

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

  constructor(formBuilder: RxFormBuilder, checkoutFormsValuesService: CheckoutFormsValuesService) {
    this.paymentAndDeliveryFormModel = checkoutFormsValuesService.paymentAndDeliveryFormValues;
    this.paymentAndDeliveryForm = formBuilder.formGroup(this.paymentAndDeliveryFormModel);
  }

  objValues(obj: Object | null) {
    return Object.values(obj || {}).map(v => v.message || v);
  }

  markAllInputsAsTouched() {
    this.paymentAndDeliveryForm?.markAllAsTouched();
  }

  get controls() {
    return this.paymentAndDeliveryForm?.controls;
  }
}
