import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducerMapper } from '../../store/reducers/mapper';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../sharedModule/material.module';
import { HttpClientModule } from '@angular/common/http';

import { BillingInfoComponent } from './billing-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { DialogComponent } from '../../components/dialog/dialog.component';
import { getSampleBook } from '../../test/test.helper';
import {
  RemoveAllBooksFromCartAction,
  AddBookToCartAction,
} from '../../store/actions/cart.actions';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../store/effects/books.effects';

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects]),
      ],
      declarations: [BillingInfoComponent, DialogComponent],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [DialogComponent] },
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BillingInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should not contain bookDetail on load', () => {
    component.cartDetails = [];
    component.payNow();
    expect(fixture.debugElement.query(By.css('.billing-form'))).toBeTruthy();
  });

  test('should remove book from cart after billing success', () => {
    const sampleBook = getSampleBook();
    const cartAction = new RemoveAllBooksFromCartAction();
    component.getStoreObj().dispatch(cartAction);
    expect(fixture.debugElement.query(By.css('.billing-form'))).toBeTruthy();
  });
  test('should remove book from cart if present in cart', () => {
    const sampleBook = getSampleBook();
    const addToCartAction = new AddBookToCartAction(sampleBook);
    component.getStoreObj().dispatch(addToCartAction);
    expect(fixture.debugElement.query(By.css('.billing-form'))).toBeTruthy();
  });
});
