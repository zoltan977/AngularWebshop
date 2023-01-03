import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormModel } from '../admin/admin-products/product-form/product-form-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products!: ProductFormModel[];
  filteredProducts!: ProductFormModel[];
  category!: string;

  constructor(private productService: ProductService, 
     route: ActivatedRoute) {
    
    this.productService.getAll()
    .pipe(switchMap(products => {
      this.products = products as ProductFormModel[];

      return route.queryParamMap;
    }))
    .subscribe(params => {
      this.category = params.get('category') as string

      this.filteredProducts = this.category ? 
        this.products.filter(p => p.category === this.category) : this.products
    })

    
  }
}
