import { Component } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account.service';

@Component({
  selector: 'display-user-account-data',
  templateUrl: './display-user-account-data.component.html',
  styleUrls: ['./display-user-account-data.component.scss']
})
export class DisplayUserAccountDataComponent {

  constructor(public userAccountService: UserAccountService) {}

  deleteCustomerName(customerNameId: string) {
    this.userAccountService.deleteCustomerName(customerNameId)
    .subscribe()
  }

  deleteDeliveryAddress(deliveryAddressId: string) {
    this.userAccountService.deleteDeliveryAddress(deliveryAddressId)
    .subscribe()
  }

}
