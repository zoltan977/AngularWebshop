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

  addProduct(product: ProductFormModel): Observable<AppError | ProductFormModel> {

    const response = this.httpClient.post<ProductFormModel>(this.PATH + "/addProduct", product);

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  getProductList(): Observable<ProductFormModel[] | AppError> {
    const response = this.httpClient.get<ProductFormModel[]>(this.PATH + "/getProductList")

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  getProduct(productId: string): Observable<ProductFormModel | AppError> {
    const response = this.httpClient.get<ProductFormModel>(this.PATH + "/getProduct/" + productId)

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  updateProduct(productId: string, productData: ProductFormModel): Observable<ProductFormModel | AppError> {
    const response = this.httpClient.post<ProductFormModel>(this.PATH + "/updateProduct/" + productId, productData)
    
    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  deleteProduct(productId: string): Observable<ProductFormModel | AppError> {
    console.log("product service delete product")
    const response = this.httpClient.delete<ProductFormModel>(this.PATH + "/deleteProduct/" + productId)
    
    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }
}
