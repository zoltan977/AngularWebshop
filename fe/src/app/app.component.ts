import { Component, OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { ShoppingCartService } from './services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-PizzaParty';
  cartLoaded: boolean = false;
  
  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    ReactiveFormConfig.set({
      "validationMessage":{
        "minNumber": "Nem lehet negatív",
        "url": "Nem megfelelő URL",
        "email": "Nem megfelelő email",
        "compare": "Jelszavak nem egyeznek"
      }
    });

    this.cartService.getCart()
    .subscribe({
      next: () => {
        this.cartLoaded = true
      }
    })
  }
  
}
