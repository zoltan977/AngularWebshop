import { TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/product-model';

import { DataService } from './data.service';

describe('DataServiceService', () => {
  let service: DataService<Product, Product, Product>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService<Product, Product, Product>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
