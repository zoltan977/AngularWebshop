import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DeliveryMethods, PaymentAndDeliveryFormModel, PaymentMethods } from 'src/app/shopping/models/order-model';
import { CheckoutFormsValuesService } from 'src/app/shopping/services/checkout-forms-values.service';

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

  errorsToArray(error: Object | null) {
    return Object.values(error || {}).map(v => v.message || v);
  }

  markAllInputsAsTouched() {
    this.paymentAndDeliveryForm?.markAllAsTouched();
  }

  get controls() {
    return this.paymentAndDeliveryForm?.controls;
  }
}
