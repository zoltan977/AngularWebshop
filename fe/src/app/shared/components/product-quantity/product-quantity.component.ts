import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product-model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input('product') product!: Product;
  @Input('small') small: boolean = false;
  
  constructor(public cartService: ShoppingCartService) {
  }

  addToCart() {
    this.cartService.addToCart(this.product, 1).subscribe()
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product, 1).subscribe();
  }
}
