import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from '../errors/appError';
import { Order } from '../models/order-model';
import serviceErrorHandler from '../utils/serviceErrorHandler';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly PATH = "http://localhost:5000/order"

  constructor(private httpClient: HttpClient, private cartService: ShoppingCartService) { 
  }

  placeOrder(order: Order): Observable<AppError | Order> {

    const response = this.httpClient.post<Order>(this.PATH + "/add", order);

    return response.pipe(
      tap(data => {
        console.log("order service response data", data);
        this.cartService.clearCart().subscribe();
      }),
      catchError(serviceErrorHandler)
      )
  }
}
