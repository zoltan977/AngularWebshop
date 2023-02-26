import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { lastValueFrom, Observable } from 'rxjs';
import { AppError } from 'src/app/shared/errors/appError';
import { FormError } from 'src/app/shared/errors/formError';
import { TypeService, ICategory } from 'src/app/shared/services/type.service';
import { ProductService } from 'src/app/shopping/services/product.service';
import setFormErrors from 'src/app/shared/utils/setFormErrors';
import { Product } from '../../../../shared/models/product-model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastService } from 'angular-toastify';

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

  constructor(private typeService: TypeService, 
              route: ActivatedRoute,
              private formBuilder: RxFormBuilder,
              private productService: ProductService,
              private router: Router,
              public dialog: MatDialog, 
              private toastService: ToastService) {

      this.id = route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.categories$ = this.typeService.getCategoryList() as Observable<ICategory[]>;
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

  async openModifyProductDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {
      title: "Biztos hogy módosítod a termék adatokat?",
      confirmButtonTitle: "Módosítás"
    }});
    const result = await lastValueFrom(dialogRef.afterClosed());
    return result;
  }

  async save() {
    console.log("productModel Data: ", this.productModel)
    let result: Observable<Product | AppError>
    let toasterMessage: string;
    const isNewProduct: boolean = !this.id;
    if (!isNewProduct) {
      if (!await this.openModifyProductDialog()) {
        this.populateForm();
        return
      }

      toasterMessage = "A módosítás sikeres volt";
      result = this.productService.update(this.productModel);
    }
    else {
      toasterMessage = "Az új termék hozzáadva";
      result = this.productService.add(this.productModel)
    }

    result
    .subscribe({
      next: () => {
        this.toastService.success(toasterMessage);
        if (isNewProduct) {
          this.router.navigate(['/admin/products']);
        }
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {
      title: "Biztos hogy törlöd ezt a terméket?",
      confirmButtonTitle: "Törlés"
    }});
    const result = await lastValueFrom(dialogRef.afterClosed());
    return result;
  }
  
  async delete() {
    if (!(await this.openDeleteProductDialog() && this.id)) return;
    
    this.productService.delete(this.id)
    .subscribe({
      next: () => {
        this.toastService.success("A termék sikeresen törölve");
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
