import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartItem } from 'src/app/models/shopping-cart-item';

@Component({
  selector: 'display-cart',
  templateUrl: './display-cart.component.html',
  styleUrls: ['./display-cart.component.scss']
})
export class DisplayCartComponent {
  @Input('is-product-quantity-dynamic') isProductQuantityDynamic: boolean = false;
  @Input('full-width') fullWidth: boolean = false;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  dataSource!: MatTableDataSource<ShoppingCartItem>;
  displayedColumns: string[] = ['imageURL', 'title', 'quantity', 'totalPrice'];
}
