import { Component, OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { AuthService } from './services/auth.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserAccountService } from './services/user-account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-PizzaParty';
  cartLoaded: boolean = false;
  userAccountDataLoaded: boolean = false;
  
  constructor(private cartService: ShoppingCartService, 
    private userAccountService: UserAccountService, private authService: AuthService) {
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
      this.userAccountService.get()
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
