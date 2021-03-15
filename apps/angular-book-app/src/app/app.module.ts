import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from './../environments/environment.prod';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/sharedModule/material.module';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DialogComponent } from './components/dialog/dialog.component';

//store module
import { reducerMapper } from '../app/store/reducers/mapper';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../app/store/effects/books.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    BookDetailsComponent,
    PageNotFoundComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(reducerMapper),
    EffectsModule.forRoot([BooksEffects]),
    environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent, DialogComponent],
})
export class AppModule {}
