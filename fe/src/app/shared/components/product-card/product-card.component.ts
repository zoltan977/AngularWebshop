import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import {Product} from '../../../shared/models/product-model'

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input('product') product!: Product
  @Input('show-actions') showActions!: boolean

  constructor(public cartService: ShoppingCartService) {
  }

  addToCart() {
    this.cartService.addToCart(this.product).subscribe()
  }

  get imageUrl() {
    return this.product.imageURL || 'assets/noimage.jpg';
  }
}
