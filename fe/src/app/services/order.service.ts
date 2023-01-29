import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from '../errors/appError';
import { OrderDataToAPI, OrderDataFromAPI } from '../models/order-model';
import serviceErrorHandler from '../utils/serviceErrorHandler';
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

  getAllByUser(): Observable<OrderDataFromAPI[] | AppError> {
    const response = this.httpClient.get<OrderDataFromAPI[]>(this.PATH + "/getAllByUser")

    return response.pipe(
      tap(data => console.log("Data service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  protected override clearShoppingCart() {
    this.cartService.clearCart().subscribe();
  }
}
