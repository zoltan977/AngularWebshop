import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { OrderFormModel } from 'src/app/models/order-model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { orderCartValidator } from 'src/app/utils/validators/orderCartValidator';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  public orderForm: FormGroup;
  public orderModel: OrderFormModel;

  constructor(
    private formBuilder: RxFormBuilder,
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private router: Router
    ) {
      this.orderModel = new OrderFormModel()
      this.orderForm = formBuilder.formGroup(this.orderModel);
  }

  markAllInputsAsTouched() {
    this.orderForm?.markAllAsTouched();
  }

  get controls() {
    return this.orderForm?.controls;
  }

  ngOnInit(): void {
    this.populateFormModel()
  }

  private populateFormModel = () => {
    const cart = this.cartService.currentCart;
    console.log("cart: ", cart)
    const userEmail = this.authService.currentUser?.user.email;
    
    Object.assign(this.orderModel, {
      userEmail,
      cart
    })

    console.log("this.orderModel: ", this.orderModel)
    this.orderForm = this.formBuilder.formGroup(this.orderModel);
    this.orderForm.controls.cart.addValidators(orderCartValidator);
    console.log("this.orderForm: ", this.orderForm)
  }

}
