import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService, OrderWithDate } from 'src/app/services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  dataSource!: MatTableDataSource<OrderWithDate>;
  displayedColumns: string[] = ['userEmail', 'name', 'dateCreated', '_id'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.populateMatTableWithProducts();
  }

  private populateMatTableWithProducts() {
    this.orderService.getAllByUser()
    .subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data as OrderWithDate[]);
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
