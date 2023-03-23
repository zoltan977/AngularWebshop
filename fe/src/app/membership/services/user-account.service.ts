import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from '../../shared/errors/appError';
import { UserAccountFormModel } from '../models/user-account-model';
import serviceErrorHandler from '../../shared/utils/serviceErrorHandler';
import { BaseDataService } from '../../shared/services/shared/base-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService extends BaseDataService<UserAccountFormModel, UserAccountFormModel> {

  private _currentUserAccountData: UserAccountFormModel = new UserAccountFormModel();

  constructor(httpClient: HttpClient) { 
    super(httpClient, "http://localhost:5000/user-account")
  }

  get currentUserAccountData() {
    return this._currentUserAccountData;
  }

  protected override setCurrentData(data: UserAccountFormModel) {
    this._currentUserAccountData = new UserAccountFormModel(data);
  }

  getByUser(): Observable<UserAccountFormModel | AppError> {
    const response = this.httpClient.get<UserAccountFormModel>(this.PATH + "/getByUser")

    return response.pipe(
      tap(data => {
        console.log("Data service response data", data);
        this.setCurrentData(data);
      }),
      catchError(serviceErrorHandler)
    )
  }

  deleteCustomerName(customerNameId: string): Observable<UserAccountFormModel | AppError> {
    const response = this.httpClient.delete<UserAccountFormModel>(this.PATH + "/customer-name/" + customerNameId)

    return response.pipe(
      tap(data => {
        console.log("UserAccountData service response data", data);
        this.setCurrentData(data as UserAccountFormModel);
      }),
      catchError(serviceErrorHandler)
    )
  }

  deleteDeliveryAddress(deliveryAddressId: string): Observable<UserAccountFormModel | AppError> {
    const response = this.httpClient.delete<UserAccountFormModel>(this.PATH + "/delivery-address/" + deliveryAddressId)

    return response.pipe(
      tap(data => {
        console.log("UserAccountData service response data", data);
        this.setCurrentData(data as UserAccountFormModel);
      }),
      catchError(serviceErrorHandler)
    )
  }
}
