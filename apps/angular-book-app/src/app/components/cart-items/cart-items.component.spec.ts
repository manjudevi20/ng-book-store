import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../sharedModule/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../sharedModule/shared.modue';

import { StoreModule } from '@ngrx/store';
import { reducerMapper } from '../../store/reducers/mapper';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../store/effects/books.effects';
import { RemoveBookFromCartAction } from '../../store/actions/cart.actions';

import { CartItemsComponent } from './cart-items.component';
import { getSampleBook } from '../../test/test.helper';

describe('CartItemsComponent', () => {
  let component: CartItemsComponent;
  let fixture: ComponentFixture<CartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects]),
      ],
      declarations: [CartItemsComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should remove book from cart', () => {
    const sampleBook = getSampleBook();
    const addToCartAction = new RemoveBookFromCartAction(sampleBook.id);
    component.getStoreObj().dispatch(addToCartAction);
    component.removeBookFromCart(sampleBook.id);
    component.payNow();
    component.ngOnInit();
    expect(component.cartDetails.length).toBe(0);
  });
});
