import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, of, Observable, switchMap } from 'rxjs';
import { AppError } from '../errors/appError';
import { Product } from '../models/product-model';
import { ShoppingCart } from '../models/shopping-cart';
import serviceErrorHandler from '../utils/serviceErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly PATH = "http://localhost:5000/cart"
  private currentShoppingCart: ShoppingCart = new ShoppingCart()

  constructor(private httpClient: HttpClient) {
    (this.getCart() as Observable<ShoppingCart>).subscribe({
      next: cart => this.currentShoppingCart = new ShoppingCart(cart)
    }) 
  }

  get currentCart() {
    return this.currentShoppingCart;
  }

  addToCart(product: Product, quantity: number) {
    const cartId = localStorage.getItem('cartId');
    const response = this.httpClient.post<ShoppingCart>(this.PATH + '/add', {product, quantity, cartId});

    return response.pipe(
      tap((cart: ShoppingCart) => {
        console.log("shopping-cart service response data", cart);
        localStorage.setItem('cartId', cart._id);
        this.currentShoppingCart = new ShoppingCart(cart);      
      }),
      catchError(serviceErrorHandler)
      )
  }

  removeFromCart(product: Product, quantity: number): Observable<ShoppingCart | AppError> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      return of(new ShoppingCart())
    }
    const response = this.httpClient.post<ShoppingCart>(this.PATH + '/remove', {product, quantity, cartId});

    return response.pipe(
      tap((cart: ShoppingCart) => {
        console.log("shopping-cart service response data", cart);
        this.currentShoppingCart = new ShoppingCart(cart);
      }),
      catchError(serviceErrorHandler)
      )
  }

  getCart(): Observable<ShoppingCart | AppError> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      return of(new ShoppingCart())
    }
    const response = this.httpClient.get<ShoppingCart>(this.PATH + '/get/' + cartId);

    return response.pipe(
      tap((cart: ShoppingCart) => {
        console.log("shopping-cart service response data", cart);
        this.currentShoppingCart = new ShoppingCart(cart);
      }),
      catchError(serviceErrorHandler)
      )
  }

  clearCart(): Observable<ShoppingCart | AppError> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      return of(new ShoppingCart())
    }
    const response = this.httpClient.delete<boolean>(this.PATH + '/clear/' + cartId);

    return response.pipe(
      switchMap((data: boolean) => {
        console.log("shopping-cart service response data", data);
        this.currentShoppingCart = new ShoppingCart();
        localStorage.removeItem('cartId');

        return of(this.currentShoppingCart)
      }),
      catchError(serviceErrorHandler)
      )
  }
}
