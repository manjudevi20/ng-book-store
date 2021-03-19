import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { BooksComponent } from './books.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../sharedModule/material.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../store/effects/books.effects';
import { reducerMapper } from '../../store/reducers/mapper';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';
import { APIErrorAction } from '../../store/actions/apiError.actions';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let debugEl: DebugElement;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects]),
      ],
      declarations: [
        BooksComponent,
        BookDetailsComponent,
        PageNotFoundComponent,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugEl = fixture.debugElement.query(By.css('form'));
    element = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should show error message on invalid form submit', () => {
    component.bookSearch.controls['bookName'].setValue('');
    fixture.detectChanges();
    component.getBooks();
    expect(component.errorMessage).toBe('Please enter a valid search text');
  });

  test('should call search books on valid form', () => {
    component.bookSearch.controls['bookName'].setValue('kalam');
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.searchBtn')).nativeElement.click();
    expect(component.errorMessage).toBe('');
  });

  test('should return error while fetching books', () => {
    const errorRes = 'Error in fetching books';
    const errorAction = new APIErrorAction(errorRes);
    component.getStoreRef().dispatch(errorAction);
    fixture.debugElement.query(By.css('.searchBtn')).nativeElement.click();
  });
});
