import { Component, Input, OnInit } from '@angular/core';
import { DeliveryMethods, PaymentMethods } from 'src/app/models/payment-and-delivery-model';
import { OrderDataFromAPI } from 'src/app/models/order-model';

@Component({
  selector: 'order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit {
  @Input('order') order!: OrderDataFromAPI
  deliveryMethodDisplayValue!: string;
  paymentMethodDisplayValue!: string;

  ngOnInit(): void {
    console.log("this.order: ", this.order)
    const deliveryMethod = DeliveryMethods.find(m => m.value === this.order.deliveryMethod);
    const paymentMethod = PaymentMethods.find(m => m.value === this.order.paymentMethod);

    if (deliveryMethod && paymentMethod) {
      this.deliveryMethodDisplayValue = deliveryMethod?.displayValue;
      this.paymentMethodDisplayValue = paymentMethod?.displayValue;
    }
  }
}
