import { Component, Input } from '@angular/core';
import { OrderWithDate } from 'src/app/models/order-model';

@Component({
  selector: 'order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.scss']
})
export class OrderDataComponent {
  @Input('order') order!: OrderWithDate
}
