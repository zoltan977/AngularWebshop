import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { map, Observable, startWith } from 'rxjs';
import { OrderFormModel } from 'src/app/models/order-model';
import { CustomerNameData, DeliveryAddressData } from 'src/app/models/user-account-model';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutFormsValuesService } from 'src/app/services/checkout-forms-values.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserAccountService } from 'src/app/services/user-account.service';
import { orderCartValidator } from 'src/app/utils/validators/orderCartValidator';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  orderForm: FormGroup;
  orderModel: OrderFormModel;

  filteredCustomerNames!: Observable<CustomerNameData[]>;
  filteredDeliveryAddresses!: Observable<DeliveryAddressData[]>;
  private customerNames: CustomerNameData[];
  private deliveryAddresses: DeliveryAddressData[];

  constructor(
    private formBuilder: RxFormBuilder,
    private authService: AuthService,
    private cartService: ShoppingCartService,
    checkoutFormsValuesService: CheckoutFormsValuesService,
    userAccountService: UserAccountService
    ) {
      this.orderModel = checkoutFormsValuesService.orderFormValues;
      this.orderForm = formBuilder.formGroup(this.orderModel);
      this.customerNames = userAccountService.currentUserAccountData.customerNames;
      this.deliveryAddresses = userAccountService.currentUserAccountData.deliveryAddresses;
  }

  deliveryAddressSelected(event: MatAutocompleteSelectedEvent) {
    this.controls.address.setValue(event.option.value.address)
    this.controls.city.setValue(event.option.value.city)
  }

  displayDeliveryAddressValue(deliveryAddress: DeliveryAddressData | string): string {
    return deliveryAddress ? typeof deliveryAddress === 'string' ? deliveryAddress : deliveryAddress.address : '';
  }

  markAllInputsAsTouched() {
    this.orderForm?.markAllAsTouched();
  }

  get controls() {
    return this.orderForm?.controls;
  }

  ngOnInit(): void {
    this.populateFormModel();
    this.settingFilteredCustomerNames();
    this.settingFilteredDeliveryAddresses();
  }

  private populateFormModel = () => {
    const cart = this.cartService.currentCart;
    const userEmail = this.authService.currentUser?.user.email;
    
    Object.assign(this.orderModel, {
      userEmail,
      cart
    })

    this.orderForm = this.formBuilder.formGroup(this.orderModel);
    this.orderForm.controls.cart.addValidators(orderCartValidator);
  }

  private settingFilteredCustomerNames() {
    this.filteredCustomerNames = this.controls.name.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => {
        return value ? this.filterCustomerNames(value) : this.customerNames.slice();
      }),
    );
  }

  private filterCustomerNames(name: string): CustomerNameData[] {
    const filterValue = name.toString().toLowerCase();

    return this.customerNames.filter(cn => cn.name.toString().toLowerCase().includes(filterValue));
  }

  private settingFilteredDeliveryAddresses() {
    this.filteredDeliveryAddresses = this.controls.address.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => {
        return value ? this.filterDeliveryAddresses(value) : this.deliveryAddresses.slice();
      }),
    );
  }

  private filterDeliveryAddresses(value: string): DeliveryAddressData[] {
    const filterValue = value.toString().toLowerCase();

    return this.deliveryAddresses.filter(da => da.city.toString().toLowerCase().includes(filterValue) || 
    da.address.toString().toLowerCase().includes(filterValue));
  }
}
