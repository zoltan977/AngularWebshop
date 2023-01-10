import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppError } from 'src/app/errors/appError';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import {Product} from '../../../models/product-model'

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product!: Product
  @Input('show-actions') showActions!: boolean
  @Input('shopping-cart') shoppingCart!: ShoppingCart

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    (this.cartService.addToCart(this.product, 1) as Observable<ShoppingCart>).subscribe({
      next: (cart) => this.shoppingCart = new ShoppingCart(cart.items, cart._id)
    })
  }

  removeFromCart() {
    (this.cartService.removeFromCart(this.product, 1) as Observable<ShoppingCart>).subscribe({
      next: (cart) => this.shoppingCart = new ShoppingCart(cart.items, cart._id)
    });
  }

  getQuantity() {
    if (!this.shoppingCart) {
      return 0
    }
    const item = this.shoppingCart.items.find((item: any) => item.product._id === this.product._id)
    return item ? item.quantity : 0
  }
}
