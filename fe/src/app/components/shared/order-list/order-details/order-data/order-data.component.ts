import { Component, Input, OnInit } from '@angular/core';
import { DeliveryMethods, PaymentMethods } from 'src/app/models/payment-and-delivery-model';
import { OrderDataFromAPI, OrderStatusList } from 'src/app/models/order-model';
import { DropDownListItemInterface } from "src/app/models/dropdownlist-item-interface";
import { OrderService } from 'src/app/services/order.service';
import { IsRouteAdmin } from 'src/app/utils/is-route-admin.service';

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

  constructor(private orderService: OrderService, public isRouteAdmin: IsRouteAdmin) {}

  selectedStatusChanged() {
    console.log("selectedStatus changed: ", this.selectedStatus)
    if (!this.order || !this.selectedStatus) {
      return
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
    this.selectedStatus = this.orderStatus?.value
  }
  
  private settingTheDeliveryAndPaymentMethod() {
    this.deliveryMethod = DeliveryMethods.find(dm => dm.value === this.order?.deliveryMethod);
    this.paymentMethod = PaymentMethods.find(pm => pm.value === this.order?.paymentMethod);
  }
}
