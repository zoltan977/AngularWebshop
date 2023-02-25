import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  dataSource!: MatTableDataSource<ShoppingCartItem>;
  displayedColumns: string[] = ['imageURL', 'title', 'quantity', 'totalPrice'];

  constructor(public cartService: ShoppingCartService) {
    
  }
  
  clearCart() {
    this.cartService.clearCart().subscribe()
  }
}
