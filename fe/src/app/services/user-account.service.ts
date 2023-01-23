import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AppError } from '../errors/appError';
import { UserAccountData, UserAccountFormModel } from '../models/user-account-model';
import serviceErrorHandler from '../utils/serviceErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private readonly PATH = "http://localhost:5000/user-account";
  private _currentUserAccountData = new UserAccountData();

  constructor(private httpClient: HttpClient) { 
  }

  get currentUserAccountData() {
    return this._currentUserAccountData;
  }

  add(userAccountData: UserAccountFormModel): Observable<AppError | UserAccountData> {

    const response = this.httpClient.post<UserAccountData>(this.PATH + "/add", userAccountData);

    return response.pipe(
      tap(data => {
        console.log("UserAccountData service response data", data);
        this._currentUserAccountData = new UserAccountData(data as UserAccountData);
      }),
      catchError(serviceErrorHandler)
    )
  }

  get(): Observable<UserAccountData | AppError> {
    const response = this.httpClient.get<UserAccountData>(this.PATH + "/get")

    return response.pipe(
      tap(data => {
        console.log("UserAccountData service response data", data);
        this._currentUserAccountData = new UserAccountData(data as UserAccountData);
      }),
      catchError(serviceErrorHandler)
    )
  }

  deleteCustomerName(customerNameId: string): Observable<UserAccountData | AppError> {
    const response = this.httpClient.delete<UserAccountData>(this.PATH + "/customer-name/" + customerNameId)

    return response.pipe(
      tap(data => {
        console.log("UserAccountData service response data", data);
        this._currentUserAccountData = new UserAccountData(data as UserAccountData);
      }),
      catchError(serviceErrorHandler)
    )
  }

  deleteDeliveryAddress(deliveryAddressId: string): Observable<UserAccountData | AppError> {
    const response = this.httpClient.delete<UserAccountData>(this.PATH + "/delivery-address/" + deliveryAddressId)

    return response.pipe(
      tap(data => {
        console.log("UserAccountData service response data", data);
        this._currentUserAccountData = new UserAccountData(data as UserAccountData);
      }),
      catchError(serviceErrorHandler)
    )
  }
}
