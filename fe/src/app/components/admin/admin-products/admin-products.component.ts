import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormModel } from './product-form/product-form-model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products$!: MatTableDataSource<ProductFormModel>;
  displayedColumns: string[] = ['title', 'price', '_id'];

  constructor(private productService: ProductService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products$.filter = filterValue.trim().toLowerCase();

    if (this.products$.paginator) {
      this.products$.paginator.firstPage();
    }
  }
  
  ngOnInit(): void {
    this.productService.getAll()
    .subscribe({
      next: (data) => this.products$ = new MatTableDataSource(data as ProductFormModel[]),
      error: (error) => {
        console.log("admin products component error:", error)
        throw error;
      }
    })
  }
}
