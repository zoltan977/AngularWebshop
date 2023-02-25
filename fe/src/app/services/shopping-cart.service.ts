import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { tap, catchError, of, Observable, switchMap } from 'rxjs';
import { AppError } from '../errors/appError';
import { Product } from '../shared/models/product-model';
import { ShoppingCart } from '../shared/models/shopping-cart';
import serviceErrorHandler from '../utils/serviceErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly LOCALSTORAGE_FIELD_OF_CART_ID = 'cartId';
  private readonly PATH = "http://localhost:5000/cart"
  private _currentCart: ShoppingCart = new ShoppingCart()

  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document) {
    console.log("Shopping cart service constructor");
  }

  get currentCart() {
    return this._currentCart;
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
        this.addToCartAnimation(product._id || "");      
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
        this._currentCart = new ShoppingCart();
        this.removeCartId()

        return of(this._currentCart)
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
      this._currentCart = new ShoppingCart(cart);
    }
  }

  private addToCartAnimation(id: string) {
    const imgToClone: any = this.document.getElementById(id);
    if (!imgToClone) {
      return
    }
    const imgToCloneData = imgToClone.getBoundingClientRect();
    const imgToCloneParent = imgToClone.parentElement;
    if (!imgToCloneParent) {
      return
    }
    const imgClone = imgToClone.cloneNode(false);

    imgClone.style.position = 'fixed';
    imgClone.style.zIndex = 100;
    
    imgToCloneParent.appendChild(imgClone);

    const addAnimation = imgClone.animate([{
      left: `${imgToCloneData.left}px`,
      top: `${imgToCloneData.top}px`,
      width: `${imgToCloneData.width}px`,
      height: `${imgToCloneData.height}px`
    }, {
      left: 'calc(100% - 50px)', 
      top: 'calc(0% + 20px)', 
      width: '20px', 
      height: '20px', 
      opacity: 0}], 
    500)

    addAnimation.onfinish = () => {
      imgClone.remove()
    }
  }
}
