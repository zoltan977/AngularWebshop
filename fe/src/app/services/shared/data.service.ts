import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from 'src/app/errors/appError';
import serviceErrorHandler from 'src/app/utils/serviceErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class DataService<AddType, ResponseType, UpdateType> {

  constructor(protected httpClient: HttpClient, @Inject(InjectionToken<string>) protected readonly PATH: string) { 
  }

  add(dataToAPI: AddType): Observable<AppError | ResponseType> {

    const response = this.httpClient.post<ResponseType>(this.PATH + "/add", dataToAPI);

    return response.pipe(
      tap(data => {
        console.log("Data service response data", data);
        this.setCurrentData(data);
        this.clearShoppingCart();
      }),
      catchError(serviceErrorHandler)
      )
  }

  getAll(): Observable<ResponseType[] | AppError> {
    const response = this.httpClient.get<ResponseType[]>(this.PATH + "/getAll")

    return response.pipe(
      tap(data => {
        console.log("Data service response data", data);
      }),
      catchError(serviceErrorHandler)
      )
  }

  getAllByUser(): Observable<ResponseType[] | AppError> {
    const response = this.httpClient.get<ResponseType[]>(this.PATH + "/getAllByUser")

    return response.pipe(
      tap(data => console.log("Data service response data", data)),
      catchError(serviceErrorHandler)
      )
  }

  get(id: string): Observable<ResponseType | AppError> {
    const response = this.httpClient.get<ResponseType>(this.PATH + "/get/" + id)

    return response.pipe(
      tap(data => {
        console.log("Data service response data", data);
      }),
      catchError(serviceErrorHandler)
      )
  }

  getByUser(): Observable<ResponseType | AppError> {
    const response = this.httpClient.get<ResponseType>(this.PATH + "/getByUser")

    return response.pipe(
      tap(data => {
        console.log("Data service response data", data);
        this.setCurrentData(data);
      }),
      catchError(serviceErrorHandler)
    )
  }

  update(dataToAPI: UpdateType): Observable<ResponseType | AppError> {
    const response = this.httpClient.put<ResponseType>(this.PATH + "/update", dataToAPI)
    
    return response.pipe(
      tap(data => {
        console.log("Data service response data", data);
      }),
      catchError(serviceErrorHandler)
      )
  }

  delete(id: string): Observable<ResponseType | AppError> {
    
    const response = this.httpClient.delete<ResponseType>(this.PATH + "/delete/" + id)
    
    return response.pipe(
      tap(data => {
        console.log("Data service response data", data);
      }),
      catchError(serviceErrorHandler)
      )
  }

  protected setCurrentData(data: ResponseType) {
  }

  protected clearShoppingCart() {
  }
}
