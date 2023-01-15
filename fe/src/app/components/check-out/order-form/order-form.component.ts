import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { FormError } from 'src/app/errors/formError';
import { Order } from 'src/app/models/order-model';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import setFormErrors from 'src/app/utils/setFormErrors';
import { orderCartValidator } from 'src/app/utils/validators/orderCartValidator';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  public orderForm: FormGroup;
  private orderModel: Order;

  constructor(
    private formBuilder: RxFormBuilder,
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private router: Router
    ) {
      this.orderModel = new Order()
      this.orderForm = formBuilder.formGroup(this.orderModel);
  }

  submit() {
    this.orderService.placeOrder(this.orderModel)
    .subscribe({
      next: (order) => {
        this.router.navigate(['/order-success', (order as Order)._id]);
      },
      error: (error) => {
        console.log("order form component error:", error)
        if (error instanceof FormError) {
          setFormErrors(error, this.orderForm)
        } else {
          throw error;
        }
      }
    })
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
