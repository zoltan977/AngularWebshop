import { Injectable } from '@angular/core';
import { OrderFormModel } from '../models/order-model';
import { PaymentAndDeliveryFormModel } from '../models/payment-and-delivery-model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormsValuesService {
  orderFormValues: OrderFormModel = new OrderFormModel();
  paymentAndDeliveryFormValues: PaymentAndDeliveryFormModel = new PaymentAndDeliveryFormModel();  
}
