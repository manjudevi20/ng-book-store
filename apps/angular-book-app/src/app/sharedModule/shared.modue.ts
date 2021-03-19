import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { BooksComponent } from '../components/books/books.component';
import { BookDetailsComponent } from '../components/book-details/book-details.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [BooksComponent, BookDetailsComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    BooksComponent,
    BookDetailsComponent,
    PageNotFoundComponent,
  ],
  providers: [],
})
export class SharedModule {}
