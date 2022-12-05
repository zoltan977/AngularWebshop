import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

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

  getCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(this.PATH)
  }
}
