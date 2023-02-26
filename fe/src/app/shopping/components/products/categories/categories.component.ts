import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeService, ICategory } from 'src/app/shared/services/type.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories$
  @Input('category') category!: string;
  
  constructor(private typeService: TypeService) {
    this.categories$ = this.typeService.getCategoryList() as Observable<ICategory[]>;
  }
}
