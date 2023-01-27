import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { AppError } from '../errors/appError';
import serviceErrorHandler from '../utils/serviceErrorHandler';

export interface ICategory {
  name: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private readonly PATH = "http://localhost:5000/type"

  constructor(private httpClient: HttpClient) { 
  }

  getCategoryList(): Observable<ICategory[] | AppError> {
    const response = this.httpClient.get<ICategory[]>(this.PATH + "/category")

    return response.pipe(
      tap(data => console.log("getCategoryList response data", data)),
      catchError(serviceErrorHandler)
      )
  }
}
