import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderDataFromAPI } from 'src/app/models/order-model';
import { OrderService } from 'src/app/services/order.service';
import { IsRouteAdmin } from 'src/app/utils/is-route-admin.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  
  order?: OrderDataFromAPI;

  constructor(public orderService: OrderService, private route: ActivatedRoute, 
    public isRouteAdmin: IsRouteAdmin, private router: Router) {}

  deleteOrder() {
    if (!this.order?._id) {
      return
    }

    this.orderService.delete(this.order?._id)
    .subscribe({
      next: () => {
        if (this.isRouteAdmin.check()) {
          this.router.navigate(['admin/orders'])
        } else {
          this.router.navigate(['my/orders'])
        }
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
