import { Injectable } from '@angular/core';
import { OrderFormModel, PaymentAndDeliveryFormModel } from '../models/order-model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormsValuesService {
  orderFormValues: OrderFormModel = new OrderFormModel();
  paymentAndDeliveryFormValues: PaymentAndDeliveryFormModel = new PaymentAndDeliveryFormModel();  
}
