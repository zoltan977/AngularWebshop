import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { FormError } from 'src/app/errors/formError';
import { OrderDataToAPI, OrderDataFromAPI, OrderFormModel } from 'src/app/models/order-model';
import { CheckoutFormsValuesService } from 'src/app/services/checkout-forms-values.service';
import { OrderService } from 'src/app/services/order.service';
import setFormErrors from 'src/app/utils/setFormErrors';
import { PaymentAndDeliveryFormModel } from '../../models/payment-and-delivery-model';

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

  constructor(private orderService: OrderService, private router: Router, 
    private toastService: ToastService,
    private checkoutFormsValuesService: CheckoutFormsValuesService) {}

  submit(orderModel: OrderFormModel, paymentAndDeliveryModel:PaymentAndDeliveryFormModel, 
    orderForm: FormGroup, paymentAndDeliveryForm: FormGroup, stepper: MatStepper) {

    const orderData: OrderDataToAPI = {...orderModel, ...paymentAndDeliveryModel};

    this.orderService.add(orderData)
    .subscribe({
      next: (order) => {
        this.resetForms();
        this.router.navigate(['/my/orders']);
        this.toastService.success("A rendelés sikeres");
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

  private resetForms() {
    this.checkoutFormsValuesService.orderFormValues = new OrderFormModel();
    this.checkoutFormsValuesService.paymentAndDeliveryFormValues = new PaymentAndDeliveryFormModel();
  }
}
