import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from '../errors/appError';
import { OrderData, OrderDataWithDateAndId } from '../models/order-model';
import serviceErrorHandler from '../utils/serviceErrorHandler';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly PATH = "http://localhost:5000/order"

  constructor(private httpClient: HttpClient, private cartService: ShoppingCartService) { 
  }

  add(order: OrderData): Observable<AppError | OrderDataWithDateAndId> {

    const response = this.httpClient.post<OrderDataWithDateAndId>(this.PATH + "/add", order);

    return response.pipe(
      tap(data => {
        console.log("order service response data", data);
        this.cartService.clearCart().subscribe();
      }),
      catchError(serviceErrorHandler)
      )
  }

  getAll(): Observable<OrderDataWithDateAndId[] | AppError> {
    const response = this.httpClient.get<OrderDataWithDateAndId[]>(this.PATH + "/getAll")

    return response.pipe(
      tap(data => console.log("order service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  getAllByUser(): Observable<OrderDataWithDateAndId[] | AppError> {
    const response = this.httpClient.get<OrderDataWithDateAndId[]>(this.PATH + "/getAllByUser")

    return response.pipe(
      tap(data => console.log("order service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  get(orderId: string): Observable<OrderDataWithDateAndId | AppError> {
    const response = this.httpClient.get<OrderDataWithDateAndId>(this.PATH + "/get/" + orderId)

    return response.pipe(
      tap(data => console.log("order service response data", data)),
      catchError(serviceErrorHandler)
      )
  }
}
