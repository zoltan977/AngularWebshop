import { Component, Input, OnInit } from '@angular/core';
import { DropDownListItemInterface, OrderDataFromAPI, OrderStatusList } from 'src/app/shopping/models/order-model';
import { OrderService } from 'src/app/shopping/services/order.service';
import { IsRouteAdmin } from 'src/app/shared/services/is-route-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { lastValueFrom } from 'rxjs';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit {
  @Input('order') order?: OrderDataFromAPI
  
  orderStatusList?: DropDownListItemInterface[];
  
  selectedStatus?: string;
  prevSelectedStatus?: string;

  constructor(private dialog: MatDialog, private orderService: OrderService, 
    public isRouteAdmin: IsRouteAdmin, private toastService: ToastService) {}

  async openModifyOrderStatusDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {
      title: "Biztos hogy módosítod a megrendelés státuszt?",
      confirmButtonTitle: "Módosít"
    }});
    const result = await lastValueFrom(dialogRef.afterClosed());
    return result;
  }

  async selectedStatusChanged() {
    console.log("selectedStatus changed: ", this.selectedStatus)
    if (!(this.order && this.selectedStatus)) {
      return
    }
    const dialogResult = await this.openModifyOrderStatusDialog();
    if (!dialogResult) {
      this.selectedStatus = this.prevSelectedStatus;
      return;
    }

    this.orderService.update({
      _id: this.order?._id,
      newStatus: this.selectedStatus
    })
    .subscribe({
      next: order => {
        this.order = order as OrderDataFromAPI;
        this.toastService.success("A módosítás sikeres volt");
        this.prevSelectedStatus = this.selectedStatus;
      },
      error: (error) => {
        this.selectedStatus = this.prevSelectedStatus;
        throw error;
      }
    })
  }

  ngOnInit(): void {
    console.log("this.order: ", this.order)
    this.settingTheSelectedStatusAndOrderStatusList();
  }
  
  private settingTheSelectedStatusAndOrderStatusList() {
    this.orderStatusList = OrderStatusList;
    this.selectedStatus = this.order?.orderStatus;
    this.prevSelectedStatus = this.selectedStatus;
  }
  
}
