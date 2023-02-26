import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product-model';
import { DataService } from '../../shared/services/shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService<Product, Product, Product> {

  constructor(httpClient: HttpClient) { 
    super(httpClient, "http://localhost:5000/product")
  }

}
