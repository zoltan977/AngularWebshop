import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from 'src/app/errors/appError';
import serviceErrorHandler from 'src/app/utils/serviceErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService<AddType, ResponseType> {

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

  protected setCurrentData(data: ResponseType) {
  }

  protected clearShoppingCart() {
  }
}
