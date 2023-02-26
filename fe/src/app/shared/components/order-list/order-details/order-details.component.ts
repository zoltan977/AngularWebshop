import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { lastValueFrom, Observable } from 'rxjs';
import { OrderDataFromAPI } from 'src/app/shopping/models/order-model';
import { OrderService } from 'src/app/shopping/services/order.service';
import { IsRouteAdmin } from 'src/app/utils/is-route-admin.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  
  order?: OrderDataFromAPI;

  constructor(public orderService: OrderService, private route: ActivatedRoute, 
    public isRouteAdmin: IsRouteAdmin, private router: Router, private dialog: MatDialog, 
    private toastService: ToastService) {}

  async openDeleteOrderDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {
      title: "Biztos hogy törlöd ezt a megrendelést?",
      confirmButtonTitle: "Törlés"
    }});
    const result = await lastValueFrom(dialogRef.afterClosed());
    return result;
  }

  async deleteOrder() {
    if (!(this.order?._id && await this.openDeleteOrderDialog())) {
      return
    }

    this.orderService.delete(this.order?._id)
    .subscribe({
      next: () => {
        this.toastService.success("A törlés sikeres volt");
        this.router.navigate(['admin/orders']);
      }
    })
  }
  
  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      const response = this.orderService.get(orderId) as Observable<OrderDataFromAPI>
      response.subscribe({
        next: order => {
          this.order = new OrderDataFromAPI(order)
        }
      })
    }
  }
}
