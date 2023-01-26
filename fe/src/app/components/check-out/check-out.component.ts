import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { FormError } from 'src/app/errors/formError';
import { OrderDataToAPI, OrderDataFromAPI, OrderFormModel } from 'src/app/models/order-model';
import { OrderService } from 'src/app/services/order.service';
import setFormErrors from 'src/app/utils/setFormErrors';
import { PaymentAndDeliveryFormModel } from './payment-and-delivery-form/payment-and-delivery-form-model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class CheckOutComponent {

  constructor(private orderService: OrderService, private router: Router) {}

  submit(orderModel: OrderFormModel, paymentAndDeliveryModel:PaymentAndDeliveryFormModel, 
    orderForm: FormGroup, paymentAndDeliveryForm: FormGroup, stepper: MatStepper) {

    const orderData: OrderDataToAPI = {...orderModel, ...paymentAndDeliveryModel};

    this.orderService.add(orderData)
    .subscribe({
      next: (order) => {
        this.router.navigate(['/order-success', (order as OrderDataFromAPI)._id]);
      },
      error: (error) => {
        console.log("order form component error:", error)
        if (error instanceof FormError) {
          setFormErrors(error, orderForm, paymentAndDeliveryForm)
          stepper.selectedIndex = 0
        } else {
          throw error;
        }
      }
    })

  }
}
