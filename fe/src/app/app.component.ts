import { Component, OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    ReactiveFormConfig.set({
      "validationMessage":{
        "minNumber": "Nem lehet negatív",
        "url": "Nem megfelelő URL",
        "email": "Nem megfelelő email",
        "compare": "Jelszavak nem egyeznek"
      }
    });
  }
  title = 'Angular-PizzaParty';
}
