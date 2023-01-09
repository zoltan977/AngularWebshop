import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Product } from '../models/product-model';
import { AppError } from '../errors/appError';
import serviceErrorHandler from '../utils/serviceErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly PATH = "http://localhost:5000/product"

  constructor(private httpClient: HttpClient) { 
  }

  add(product: Product): Observable<AppError | Product> {

    const response = this.httpClient.post<Product>(this.PATH + "/add", product);

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  getAll(): Observable<Product[] | AppError> {
    const response = this.httpClient.get<Product[]>(this.PATH + "/getAll")

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  get(productId: string): Observable<Product | AppError> {
    const response = this.httpClient.get<Product>(this.PATH + "/get/" + productId)

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  update(productId: string, productData: Product): Observable<Product | AppError> {
    const response = this.httpClient.post<Product>(this.PATH + "/update/" + productId, productData)
    
    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  delete(productId: string): Observable<Product | AppError> {
    console.log("product service delete product")
    const response = this.httpClient.delete<Product>(this.PATH + "/delete/" + productId)
    
    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }
}
