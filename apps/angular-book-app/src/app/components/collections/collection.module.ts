import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsComponent } from './collections.component';
import { MaterialModule } from '../../sharedModule/material.module';
import { CollectionRoutingModule } from './collection-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [CommonModule, CollectionRoutingModule, FormsModule, MaterialModule],
})
export class CollectionModule {}
