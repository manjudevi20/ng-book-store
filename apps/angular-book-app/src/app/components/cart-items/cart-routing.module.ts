import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CartItemsComponent } from './cart-items.component';

const routes: Routes = [
  {
    path: '',
    component: CartItemsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CartRoutingModule {}
