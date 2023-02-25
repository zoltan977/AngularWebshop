import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap} from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../shared/models/product-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  filteredProducts!: Product[];
  category!: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.populateProducts()    
  }

  private populateProducts() {
    this.productService.getAll()
    .pipe(switchMap(products => {

      this.products = products as Product[];
      return this.route.queryParamMap;
    }))
    .subscribe(params => {

      this.category = params.get('category') as string
      this.applyFilter()
    })
  }

  private applyFilter() {
    this.filteredProducts = this.category ? 
        this.products.filter(p => p.category === this.category) : this.products
  }
}
