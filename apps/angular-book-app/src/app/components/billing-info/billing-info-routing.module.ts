import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BillingInfoComponent } from './billing-info.component';

const routes: Routes = [
  {
    path: '',
    component: BillingInfoComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BillingInfoRoutingModule {}
