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
export class CategoryService {
  private readonly PATH = "http://localhost:5000/type/category"

  constructor(private httpClient: HttpClient) { 
  }

  getAll(): Observable<ICategory[] | AppError> {
    const response = this.httpClient.get<ICategory[]>(this.PATH)

    return response.pipe(
      tap(data => console.log("category service response data", data)),
      catchError(serviceErrorHandler)
      )
  }
}
