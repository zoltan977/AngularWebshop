import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from '../errors/appError';
import { OrderDataToAPI, OrderDataFromAPI } from '../models/order-model';
import serviceErrorHandler from '../utils/serviceErrorHandler';
import { ShoppingCartService } from './shopping-cart.service';

interface IOrderStatusUpdateRequest {
  _id: string;
  newStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly PATH = "http://localhost:5000/order"

  constructor(private httpClient: HttpClient, private cartService: ShoppingCartService) { 
  }

  add(order: OrderDataToAPI): Observable<AppError | OrderDataFromAPI> {

    const response = this.httpClient.post<OrderDataFromAPI>(this.PATH + "/add", order);

    return response.pipe(
      tap(data => {
        console.log("order service response data", data);
        this.cartService.clearCart().subscribe();
      }),
      catchError(serviceErrorHandler)
      )
  }

  update(stateUpdateRequest: IOrderStatusUpdateRequest): Observable<AppError | OrderDataFromAPI> {

    const response = this.httpClient.post<OrderDataFromAPI>(this.PATH + "/update", stateUpdateRequest);

    return response.pipe(
      tap(data => {
        console.log("order service response data", data);
      }),
      catchError(serviceErrorHandler)
      )
  }

  getAll(): Observable<OrderDataFromAPI[] | AppError> {
    const response = this.httpClient.get<OrderDataFromAPI[]>(this.PATH + "/getAll")

    return response.pipe(
      tap(data => console.log("order service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  getAllByUser(): Observable<OrderDataFromAPI[] | AppError> {
    const response = this.httpClient.get<OrderDataFromAPI[]>(this.PATH + "/getAllByUser")

    return response.pipe(
      tap(data => console.log("order service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  get(orderId: string): Observable<OrderDataFromAPI | AppError> {
    const response = this.httpClient.get<OrderDataFromAPI>(this.PATH + "/get/" + orderId)

    return response.pipe(
      tap(data => console.log("order service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  delete(orderId: string): Observable<OrderDataFromAPI | AppError> {
    const response = this.httpClient.delete<OrderDataFromAPI>(this.PATH + "/delete/" + orderId)

    return response.pipe(
      tap(data => console.log("order service response data", data)),
      catchError(serviceErrorHandler)
      )
  }
}
