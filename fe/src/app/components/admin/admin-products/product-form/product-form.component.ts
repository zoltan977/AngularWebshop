import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { CategoryService, ICategory } from 'src/app/services/category.service';
import { ProductFormModel } from './product-form-model';

@Component({
  selector: 'app-product-form-component',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public categories$: Observable<ICategory[]> | undefined;
  public productModel: ProductFormModel = new ProductFormModel();
  public newProductForm: FormGroup = new FormGroup({});

  constructor(private categoryService: CategoryService, private formBuilder: RxFormBuilder) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.newProductForm = this.formBuilder.formGroup(this.productModel);
  }

  addNewProduct() {
    console.log("productData: ", this.productModel)
  }
  
  markAllInputsAsTouched() {
    this.newProductForm?.markAllAsTouched();
  }

  get controls() {
    return this.newProductForm?.controls;
  }
}
