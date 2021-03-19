import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,

    MatListModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,

    MatListModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class MaterialModule {}
