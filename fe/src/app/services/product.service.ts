import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ProductFormModel } from '../components/admin/admin-products/product-form/product-form-model';
import { AppError } from '../errors/appError';
import serviceErrorHandler from '../utils/serviceErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly PATH = "http://localhost:5000/product"

  constructor(private httpClient: HttpClient) { 
  }

  add(product: ProductFormModel): Observable<AppError | ProductFormModel> {

    const response = this.httpClient.post<ProductFormModel>(this.PATH + "/add", product);

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  getAll(): Observable<ProductFormModel[] | AppError> {
    const response = this.httpClient.get<ProductFormModel[]>(this.PATH + "/getAll")

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  get(productId: string): Observable<ProductFormModel | AppError> {
    const response = this.httpClient.get<ProductFormModel>(this.PATH + "/get/" + productId)

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  update(productId: string, productData: ProductFormModel): Observable<ProductFormModel | AppError> {
    const response = this.httpClient.post<ProductFormModel>(this.PATH + "/update/" + productId, productData)
    
    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  delete(productId: string): Observable<ProductFormModel | AppError> {
    console.log("product service delete product")
    const response = this.httpClient.delete<ProductFormModel>(this.PATH + "/delete/" + productId)
    
    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }
}
