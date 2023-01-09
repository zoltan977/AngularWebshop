import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from '../../models/product-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  filteredProducts!: Product[];
  category!: string;
  cart: any;

  constructor(private productService: ProductService, 
     route: ActivatedRoute, private cartService: ShoppingCartService) {
    
    this.productService.getAll()
    .pipe(switchMap(products => {
      this.products = products as Product[];

      return route.queryParamMap;
    }))
    .subscribe(params => {
      this.category = params.get('category') as string

      this.filteredProducts = this.category ? 
        this.products.filter(p => p.category === this.category) : this.products
    })

    
  }
  ngOnInit(): void {
    this.cartService.getCart().pipe(take(1)).subscribe({
      next: cart => {
        this.cart = cart
      }
    })
  }
}
