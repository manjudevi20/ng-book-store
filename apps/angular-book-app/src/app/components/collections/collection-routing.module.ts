import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CollectionsComponent } from './collections.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class CollectionRoutingModule { }