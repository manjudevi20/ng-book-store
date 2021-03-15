import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingInfoComponent } from './billing-info.component';
import { MaterialModule } from '../../sharedModule/material.module';
import { BillingInfoRoutingModule } from './billing-info-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BillingInfoComponent],
  imports: [
    CommonModule,
    BillingInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class BillingInfoModule {}
