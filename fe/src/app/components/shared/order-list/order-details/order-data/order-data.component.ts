import { Component, Input, OnInit } from '@angular/core';
import { DeliveryMethods, PaymentMethods } from 'src/app/models/payment-and-delivery-model';
import { OrderDataFromAPI, OrderStatusList } from 'src/app/models/order-model';
import { DropDownListItemInterface } from "src/app/models/dropdownlist-item-interface";
import { OrderService } from 'src/app/services/order.service';
import { IsRouteAdmin } from 'src/app/utils/is-route-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent implements OnInit {
  @Input('order') order?: OrderDataFromAPI
  
  deliveryMethod?: DropDownListItemInterface;
  paymentMethod?: DropDownListItemInterface;

  orderStatusList?: DropDownListItemInterface[];
  orderStatus?: DropDownListItemInterface;
  
  selectedStatus?: string;
  prevSelectedStatus?: string;

  constructor(private dialog: MatDialog, private orderService: OrderService, public isRouteAdmin: IsRouteAdmin) {}

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
      next: order => this.order = order as OrderDataFromAPI
    })
  }

  ngOnInit(): void {
    console.log("this.order: ", this.order)
    this.settingTheSelectedStatusAndOrderStatus();
    this.settingTheDeliveryAndPaymentMethod();
  }
  
  private settingTheSelectedStatusAndOrderStatus() {
    this.orderStatusList = OrderStatusList;
    this.orderStatus = OrderStatusList.find(os => os.value === this.order?.orderStatus);
    this.selectedStatus = this.orderStatus?.value;
    this.prevSelectedStatus = this.selectedStatus;
  }
  
  private settingTheDeliveryAndPaymentMethod() {
    this.deliveryMethod = DeliveryMethods.find(dm => dm.value === this.order?.deliveryMethod);
    this.paymentMethod = PaymentMethods.find(pm => pm.value === this.order?.paymentMethod);
  }
}
