import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderDataWithDateAndId } from 'src/app/models/order-model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  
  order: OrderDataWithDateAndId = new OrderDataWithDateAndId();

  constructor(public orderService: OrderService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      const response = this.orderService.get(orderId) as Observable<OrderDataWithDateAndId>
      response.subscribe({
        next: order => {
          this.order = new OrderDataWithDateAndId(order)
        }
      })
    }
  }
}