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
  dataSource!: MatTableDataSource<ProductFormModel>;
  displayedColumns: string[] = ['title', 'price', '_id'];

  constructor(private productService: ProductService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  ngOnInit(): void {
    this.productService.getAll()
    .subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data as ProductFormModel[])
        this.dataSource.filterPredicate = function (record,filter) {
          return record.title.toLowerCase().includes(filter.toLowerCase()) || 
          record.price.toString().toLowerCase().includes(filter.toLowerCase());
        }
      },
      error: (error) => {
        console.log("admin products component error:", error)
        throw error;
      }
    })
  }
}
