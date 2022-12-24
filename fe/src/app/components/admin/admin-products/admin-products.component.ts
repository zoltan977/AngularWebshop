import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormModel } from './product-form/product-form-model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products$!: ProductFormModel[];
  displayedColumns: string[] = ['title', 'price', '_id'];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll()
    .subscribe({
      next: (data) => this.products$ = data as ProductFormModel[],
      error: (error) => {
        console.log("admin products component error:", error)
        throw error;
      }
    })
  }
}
