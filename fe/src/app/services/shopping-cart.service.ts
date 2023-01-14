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
  private readonly LOCALSTORAGE_FIELD_OF_CART_ID = 'cartId';
  private readonly PATH = "http://localhost:5000/cart"
  private currentShoppingCart: ShoppingCart = new ShoppingCart()

  constructor(private httpClient: HttpClient) {
    console.log("Shopping cart service constructor");
  }

  get currentCart() {
    return this.currentShoppingCart;
  }

  get currentCartId() {
    return this.getCartId()
  }

  addToCart(product: Product, quantity: number) {
    const cartId = this.getCartId()
    const response = this.httpClient.post<ShoppingCart>(this.PATH + '/add', {product, quantity, cartId});

    return response.pipe(
      tap((cart: ShoppingCart) => {
        console.log("shopping-cart service ADD response data", cart);
        this.setCartId(cart._id)
        this.setCurrentShoppingCart(cart);      
      }),
      catchError(serviceErrorHandler)
      )
  }

  removeFromCart(product: Product, quantity: number): Observable<ShoppingCart | AppError> {
    const cartId = this.getCartId()
    if (!cartId) {
      return of(new ShoppingCart())
    }
    const response = this.httpClient.post<ShoppingCart>(this.PATH + '/remove', {product, quantity, cartId});

    return response.pipe(
      tap((cart: ShoppingCart) => {
        console.log("shopping-cart service REMOVE response data", cart);
        this.setCurrentShoppingCart(cart);
      }),
      catchError(serviceErrorHandler)
      )
  }

  getCart(): Observable<ShoppingCart | AppError> {
    const cartId = this.getCartId()
    if (!cartId) {
      return of(new ShoppingCart())
    }
    const response = this.httpClient.get<ShoppingCart>(this.PATH + '/get/' + cartId);

    return response.pipe(
      tap((cart: ShoppingCart) => {
        console.log("shopping-cart service GET response data", cart);
        this.setCurrentShoppingCart(cart);
      }),
      catchError(serviceErrorHandler)
      )
  }

  clearCart(): Observable<ShoppingCart | AppError> {
    const cartId = this.getCartId()
    if (!cartId) {
      return of(new ShoppingCart())
    }
    const response = this.httpClient.delete<boolean>(this.PATH + '/clear/' + cartId);

    return response.pipe(
      switchMap((data: boolean) => {
        console.log("shopping-cart service CLEAR response data", data);
        this.currentShoppingCart = new ShoppingCart();
        this.removeCartId()

        return of(this.currentShoppingCart)
      }),
      catchError(serviceErrorHandler)
      )
  }

  private getCartId() {
    return localStorage.getItem(this.LOCALSTORAGE_FIELD_OF_CART_ID)
  }

  private setCartId(cartId: string) {
    return localStorage.setItem(this.LOCALSTORAGE_FIELD_OF_CART_ID, cartId)
  }

  private removeCartId() {
    return localStorage.removeItem(this.LOCALSTORAGE_FIELD_OF_CART_ID)
  }

  private setCurrentShoppingCart = (cart: ShoppingCart) => {
    console.log("setCurrentShoppingCart cart: ", cart)
    if (!cart.items.length) {
      this.clearCart().subscribe()
    }
    else {
      this.currentShoppingCart = new ShoppingCart(cart);
    }
  }
}
