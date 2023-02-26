import { Component, OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { AuthService } from './shared/services/auth.service';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { UserAccountService } from './membership/services/user-account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Webshop';
  cartLoaded: boolean = false;
  userAccountDataLoaded: boolean = false;
  
  constructor(private cartService: ShoppingCartService, 
    private userAccountService: UserAccountService, private authService: AuthService) {
  }

  get cartAndUserAccountDataLoaded() {
    return this.cartLoaded && this.userAccountDataLoaded
  }

  ngOnInit(): void {
    this.settingValidationMessagesForRxWebForms()
    this.preloadingShoppingCartData()
    this.preloadingUserAccountData()
  }

  private preloadingShoppingCartData() {
    this.cartService.getCart()
    .subscribe({
      complete: () => this.cartLoaded = true
    })
  }

  private preloadingUserAccountData() {
    if (this.authService.userLoggedIn) {
      this.userAccountService.getByUser()
      .subscribe({
        complete: () => this.userAccountDataLoaded = true
      })
    } else {
      this.userAccountDataLoaded = true
    }
  }
  
  private settingValidationMessagesForRxWebForms() {
    ReactiveFormConfig.set({
      "validationMessage":{
        "minNumber": "Nem lehet negatív",
        "url": "Nem megfelelő URL",
        "email": "Nem megfelelő email",
        "compare": "Jelszavak nem egyeznek"
      }
    });
  }
}
