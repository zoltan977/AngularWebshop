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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { OrderDetailsComponent } from './components/order-list/order-details/order-details.component';
import { OrderDataComponent } from './components/order-list/order-details/order-data/order-data.component';
import { ShoppingCartService } from './services/shopping-cart.service';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    DisplayCartComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderDataComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    NavbarComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    DisplayCartComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderDataComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    NavbarComponent,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DataTablesFilterValuesService,
    TypeService,
    ShoppingCartService
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([])
  ]
})
export class SharedModule { }
