import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { map, Observable, startWith } from 'rxjs';
import { OrderFormModel } from 'src/app/shopping/models/order-model';
import { CustomerName, DeliveryAddress } from 'src/app/membership/models/user-account-model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CheckoutFormsValuesService } from 'src/app/shopping/services/checkout-forms-values.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { UserAccountService } from 'src/app/membership/services/user-account.service';
import { orderCartValidator } from 'src/app/shopping/utils/validators/orderCartValidator';
import { DropDownListElementInterface } from 'src/app/shared/components/mat-form-field/mat-form-field.component';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  orderForm: FormGroup;
  orderModel: OrderFormModel;

  filteredCustomerNames!: Observable<CustomerName[]>;
  filteredDeliveryAddresses!: Observable<DeliveryAddress[]>;
  private customerNames: CustomerName[];
  private deliveryAddresses: DeliveryAddress[];

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

  displayDeliveryAddressValue(deliveryAddress: DeliveryAddress | string): string {
    return deliveryAddress ? typeof deliveryAddress === 'string' ? deliveryAddress : deliveryAddress.address : '';
  }

  markAllInputsAsTouched() {
    this.orderForm?.markAllAsTouched();
  }

  get controls() {
    return this.orderForm?.controls;
  }

  get nameAutoCompleterProps(): DropDownListElementInterface {
    return {
      optionList: this.filteredCustomerNames, 
      getValue: (option: CustomerName) => option.name, 
      getDisplayValue: (option: CustomerName) => option.name
    }
  }

  get addressAutoCompleterProps(): DropDownListElementInterface {
    return {
      optionList: this.filteredDeliveryAddresses, 
      getValue: (option: DeliveryAddress) => option, 
      getDisplayValue: (option: DeliveryAddress) => `${option.city} - ${option.address}`,
      optionSelected: this.deliveryAddressSelected.bind(this),
      displayWith: this.displayDeliveryAddressValue
    }
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

  private filterCustomerNames(name: string): CustomerName[] {
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

  private filterDeliveryAddresses(value: string): DeliveryAddress[] {
    const filterValue = value.toString().toLowerCase();

    return this.deliveryAddresses.filter(da => da.city.toString().toLowerCase().includes(filterValue) || 
    da.address.toString().toLowerCase().includes(filterValue));
  }
}
