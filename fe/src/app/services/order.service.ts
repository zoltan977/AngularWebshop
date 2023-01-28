import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDataToAPI, OrderDataFromAPI } from '../models/order-model';
import { DataService } from './shared/data.service';
import { ShoppingCartService } from './shopping-cart.service';

interface IOrderStatusUpdateRequest {
  _id: string;
  newStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService<OrderDataToAPI, OrderDataFromAPI, IOrderStatusUpdateRequest> {

  constructor(httpClient: HttpClient, private cartService: ShoppingCartService) { 
    super(httpClient, "http://localhost:5000/order")
  }

  override clearShoppingCart() {
    this.cartService.clearCart().subscribe();
  }
}
