import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, of } from 'rxjs';
import { Product } from '../models/product-model';
import serviceErrorHandler from '../utils/serviceErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly PATH = "http://localhost:5000/cart"

  constructor(private httpClient: HttpClient) { 
  }

  addToCart(product: Product, quantity: number) {
    const cartId = localStorage.getItem('cartId');
    const response = this.httpClient.post(this.PATH + '/add', {product, quantity, cartId});

    return response.pipe(
      tap((data: any) => {
        console.log("shopping-cart service response data", data);
        localStorage.setItem('cartId', data._id)        
      }),
      catchError(serviceErrorHandler)
      )
  }

  removeFromCart(product: Product, quantity: number) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      return of(null)
    }
    const response = this.httpClient.post(this.PATH + '/remove', {product, quantity, cartId});

    return response.pipe(
      tap((data: any) => {
        console.log("shopping-cart service response data", data);
      }),
      catchError(serviceErrorHandler)
      )
  }

  getCart() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      return of(null)
    }
    const response = this.httpClient.get(this.PATH + '/get/' + cartId);

    return response.pipe(
      tap((data: any) => {
        console.log("shopping-cart service response data", data);
      }),
      catchError(serviceErrorHandler)
      )
  }
}
