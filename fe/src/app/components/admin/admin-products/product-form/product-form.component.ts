import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { lastValueFrom, Observable } from 'rxjs';
import { AppError } from 'src/app/errors/appError';
import { FormError } from 'src/app/errors/formError';
import { CategoryService, ICategory } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import setFormErrors from 'src/app/utils/setFormErrors';
import { Product } from '../../../../models/product-model';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product-form-component',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  public categories$!: Observable<ICategory[]>;
  public productModel!: Product;
  public newProductForm!: FormGroup;
  public id;

  constructor(private categoryService: CategoryService, 
              route: ActivatedRoute,
              private formBuilder: RxFormBuilder,
              private productService: ProductService,
              private router: Router,
              public dialog: MatDialog) {

      this.id = route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll() as Observable<ICategory[]>;
    this.productModel = new Product();
    this.newProductForm = this.formBuilder.formGroup(this.productModel);

    if (this.id) {
      this.populateForm();
    }
  }

  private populateForm() {
    this.productService.get(this.id!)
    .subscribe({
      next: (data: Product | AppError) => {
        Object.assign(this.productModel, data as Product)
        console.log("this.productModel: ", this.productModel)
        this.newProductForm = this.formBuilder.formGroup(this.productModel);
      }
    })
  }

  save() {
    console.log("productModel Data: ", this.productModel)
    let result: Observable<Product | AppError>
    if (this.id)
      result = this.productService.update(this.productModel)
    else
      result = this.productService.add(this.productModel)

    result
    .subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
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

  async openDeleteProductDialog() {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent);
    const result = await lastValueFrom(dialogRef.afterClosed());
    return result;
  }
  
  async delete() {
    if (!(await this.openDeleteProductDialog() && this.id)) return;
    
    this.productService.delete(this.id)
    .subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
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
