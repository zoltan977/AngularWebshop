import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ProductFormModel } from '../components/admin/admin-products/product-form/product-form-model';
import { AppError } from '../errors/appError';
import { CredentialsError } from '../errors/credentialsError';
import { FormError } from '../errors/formError';
import serviceErrorHandler from '../utils/serviceErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly PATH = "http://localhost:5000/product"

  constructor(private httpClient: HttpClient) { 
  }

  addProduct(product: ProductFormModel): Observable<AppError | FormError | CredentialsError | ProductFormModel> {

    const response = this.httpClient.post<ProductFormModel>(this.PATH + "/addProduct", product);

    return response.pipe(
      tap(data => console.log("product service response data", data)),
      catchError(serviceErrorHandler)
      )
  }
}
