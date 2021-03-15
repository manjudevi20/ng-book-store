import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BookDetailsComponent } from './book-details.component';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../../sharedModule/material.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../store/effects/books.effects';
import { reducerMapper } from '../../store/reducers/mapper';
import { ChangeBooks } from '../../store/actions/book.actions';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { BooksComponent } from '../books/books.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { getSampleBook } from '../../test/test.helper';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects]),
      ],
      declarations: [
        BookDetailsComponent,
        BooksComponent,
        PageNotFoundComponent,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ bookId: getSampleBook().id }),
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should not contain bookDetail on load', () => {
    expect(fixture.debugElement.query(By.css('.bookDtl-card'))).toBeFalsy();
  });

  test('should show book details', () => {
    component.bookDetails = getSampleBook();
    component.setSelectedBookId(component.bookDetails.id);
    component.setCartList({ ids: [component.bookDetails.id] });
    component.checkForItemInCart();
    component.addBookToCart();
    component.buyItem();
    component.getStoreRef();
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.bookDtl-card')).nativeElement
    ).toBeTruthy();
  });

  test('should show add to cart option if selected book not present in cart', () => {
    component.bookDetails = getSampleBook();
    component.setSelectedBookId('');
    component.checkForItemInCart();
    expect(component.itemBought).toBeFalsy();
  });

  test('should get book details from book list', () => {
    const sampleBook = getSampleBook();
    const booksAction = new ChangeBooks([sampleBook]);
    component.getStoreRef().dispatch(booksAction);
    component.setSelectedBookId(sampleBook.id);
    component.ngOnInit();
    expect(component.bookDetails.id).toBe(sampleBook.id);
  });
});
