import { Component, Input, OnInit } from '@angular/core';
import { DeliveryMethods, PaymentMethods } from 'src/app/components/check-out/payment-and-delivery-form/payment-and-delivery-form-model';
import { OrderDataWithDateAndId } from 'src/app/models/order-model';

@Component({
  selector: 'order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit {
  @Input('order') order!: OrderDataWithDateAndId
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
