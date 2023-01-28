import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AppError } from '../errors/appError';
import { UserAccountData, UserAccountFormModel } from '../models/user-account-model';
import serviceErrorHandler from '../utils/serviceErrorHandler';
import { DataService } from './shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService extends DataService<UserAccountFormModel, UserAccountData, UserAccountFormModel> {

  private _currentUserAccountData: UserAccountData = new UserAccountData();

  constructor(httpClient: HttpClient) { 
    super(httpClient, "http://localhost:5000/user-account")
  }

  get currentUserAccountData() {
    return this._currentUserAccountData;
  }

  override setCurrentData(data: UserAccountData) {
    this._currentUserAccountData = new UserAccountData(data);
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
