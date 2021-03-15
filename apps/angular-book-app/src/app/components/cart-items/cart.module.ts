import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemsComponent } from './cart-items.component';
import { MaterialModule } from '../../sharedModule/material.module';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartItemsComponent],
  imports: [CommonModule, CartRoutingModule, FormsModule, MaterialModule],
})
export class CartModule {}
