import { Component, Input } from '@angular/core';
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
  @Input('shopping-cart') shoppingCart: any

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product, 1).subscribe({
      next: (cart) => this.shoppingCart = cart
    })
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product, 1).subscribe({
      next: (cart) => this.shoppingCart = cart
    })
  }

  getQuantity() {
    if (!this.shoppingCart) {
      return 0
    }
    const item = this.shoppingCart.items.find((item: any) => item.product.title === this.product.title)
    return item ? item.quantity : 0
  }
}
