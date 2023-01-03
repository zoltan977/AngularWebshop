import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService, ICategory } from 'src/app/services/category.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories$
  @Input('category') category!: string;
  
  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll() as Observable<ICategory[]>;
  }
}
