import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterValuesService {
  ordersFilter: string = ""
  productsFilter: string = ""
}
