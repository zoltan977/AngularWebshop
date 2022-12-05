import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryService, ICategory } from 'src/app/services/category.service';
import { ProductFormModel } from './product-form-model';

@Component({
  selector: 'app-product-form-component',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('newProductForm') newProductForm: NgForm | undefined;
  public categories$: Observable<ICategory[]> | undefined;
  public productModel: ProductFormModel = new ProductFormModel();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories()
  }

  addNewProduct() {
    console.log("productData: ", this.productModel)
  }
  
  markAllInputsAsTouched() {
    this.newProductForm?.control.markAllAsTouched()
  }

  get controls() {
    return this.newProductForm?.controls;
  }
}
