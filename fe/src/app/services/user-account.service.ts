import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from '../errors/appError';
import { UserAccountData, UserAccountFormModel } from '../models/user-account-model';
import serviceErrorHandler from '../utils/serviceErrorHandler';
import { BaseDataService } from '../shared/services/shared/base-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService extends BaseDataService<UserAccountFormModel, UserAccountData> {

  private _currentUserAccountData: UserAccountData = new UserAccountData();

  constructor(httpClient: HttpClient) { 
    super(httpClient, "http://localhost:5000/user-account")
  }

  get currentUserAccountData() {
    return this._currentUserAccountData;
  }

  protected override setCurrentData(data: UserAccountData) {
    this._currentUserAccountData = new UserAccountData(data);
  }

  getByUser(): Observable<UserAccountData | AppError> {
    const response = this.httpClient.get<UserAccountData>(this.PATH + "/getByUser")

    return response.pipe(
      tap(data => {
        console.log("Data service response data", data);
        this.setCurrentData(data);
      }),
      catchError(serviceErrorHandler)
    )
  }

  deleteCustomerName(customerNameId: string): Observable<UserAccountData | AppError> {
    const response = this.httpClient.delete<UserAccountData>(this.PATH + "/customer-name/" + customerNameId)

    return response.pipe(
      tap(data => {
        console.log("UserAccountData service response data", data);
        this.setCurrentData(data as UserAccountData);
      }),
      catchError(serviceErrorHandler)
    )
  }

  deleteDeliveryAddress(deliveryAddressId: string): Observable<UserAccountData | AppError> {
    const response = this.httpClient.delete<UserAccountData>(this.PATH + "/delivery-address/" + deliveryAddressId)

    return response.pipe(
      tap(data => {
        console.log("UserAccountData service response data", data);
        this.setCurrentData(data as UserAccountData);
      }),
      catchError(serviceErrorHandler)
    )
  }
}
