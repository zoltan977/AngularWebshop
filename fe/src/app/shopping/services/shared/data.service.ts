import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from 'src/app/shared/errors/appError';
import serviceErrorHandler from 'src/app/shared/utils/serviceErrorHandler';
import { BaseDataService } from '../../../shared/services/shared/base-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService<AddType, ResponseType, UpdateType> extends BaseDataService<AddType, ResponseType> {

  constructor(httpClient: HttpClient, @Inject(InjectionToken<string>) PATH: string) { 
    super(httpClient, PATH)
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
  
  get(id: string): Observable<ResponseType | AppError> {
    const response = this.httpClient.get<ResponseType>(this.PATH + "/get/" + id)

    return response.pipe(
      tap(data => {
        console.log("Data service response data", data);
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

}
