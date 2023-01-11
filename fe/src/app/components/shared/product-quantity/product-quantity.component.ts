import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product-model';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

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