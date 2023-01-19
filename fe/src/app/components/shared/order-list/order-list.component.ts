import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AppError } from 'src/app/errors/appError';
import { OrderDataWithDateAndId } from 'src/app/models/order-model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit{
  dataSource!: MatTableDataSource<OrderDataWithDateAndId>;
  displayedColumns: string[] = ['userEmail', 'name', 'dateCreated', '_id'];
  @ViewChild(MatSort) sort!: MatSort;
  @Input('admin') admin: boolean = false;

  constructor(private orderService: OrderService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.populateMatTableWithProducts();
  }

  private populateMatTableWithProducts() {
    const orderList$: Observable<OrderDataWithDateAndId[] | AppError> =
    this.admin ? this.orderService.getAll() : this.orderService.getAllByUser();

    orderList$
    .subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data as OrderDataWithDateAndId[]);
        this.dataSource.sort = this.sort;

        this.settingMatTableFilter();
      },
      error: (error) => {
        console.log("admin orders component error:", error)
        throw error;
      }
    })
  }

  private settingMatTableFilter() {
    this.dataSource.filterPredicate = function (record,filter) {
      return record.userEmail.toLowerCase().includes(filter.toLowerCase()) || 
      record.name.toString().toLowerCase().includes(filter.toLowerCase());
    }
  }

}
