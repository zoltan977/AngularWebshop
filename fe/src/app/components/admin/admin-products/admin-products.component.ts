import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../models/product-model'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', '_id'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnInit(): void {
    this.populateMatTableWithProducts();
  }

  private populateMatTableWithProducts() {
    this.productService.getAll()
    .subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data as Product[]);
        this.dataSource.sort = this.sort;

        this.settingMatTableFilter();
      },
      error: (error) => {
        console.log("admin products component error:", error)
        throw error;
      }
    })
  }

  private settingMatTableFilter() {
    this.dataSource.filterPredicate = function (record,filter) {
      return record.title.toLowerCase().includes(filter.toLowerCase()) || 
      record.price.toString().toLowerCase().includes(filter.toLowerCase());
    }
  }
}
