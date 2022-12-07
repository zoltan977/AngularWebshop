import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { FormError } from 'src/app/errors/formError';
import { CategoryService, ICategory } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import setFormErrors from 'src/app/utils/setFormErrors';
import { ProductFormModel } from './product-form-model';

@Component({
  selector: 'app-product-form-component',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public categories$!: Observable<ICategory[]>;
  public productModel!: ProductFormModel;
  public newProductForm!: FormGroup;

  constructor(private categoryService: CategoryService, 
              private formBuilder: RxFormBuilder,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.productModel = new ProductFormModel();
    this.newProductForm = this.formBuilder.formGroup(this.productModel);
  }

  addNewProduct() {
    console.log("productModel Data: ", this.productModel)
    this.productService.addProduct(this.productModel)
    .subscribe({
      error: (error) => {
        console.log("product form component error:", error)
        if (error instanceof FormError) {
          setFormErrors(error, this.newProductForm)
        } else {
          throw error;
        }
      }
    })
  }
  
  markAllInputsAsTouched() {
    this.newProductForm?.markAllAsTouched();
  }

  get controls() {
    return this.newProductForm?.controls;
  }
}
