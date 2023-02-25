import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DisplayCartComponent } from './components/display-cart/display-cart.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { DataTablesFilterValuesService } from './services/data-tables-filter-values.service';
import { TypeService } from './services/type.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    DisplayCartComponent,
    OrderListComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ConfirmDialogComponent,
    DisplayCartComponent,
    OrderListComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DataTablesFilterValuesService,
    TypeService
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    RouterModule.forChild([])
  ]
})
export class SharedModule { }
