import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../sharedModule/material.module';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../sharedModule/shared.modue';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { StoreModule } from '@ngrx/store';
import { reducerMapper } from '../../store/reducers/mapper';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from '../../store/effects/books.effects';
import {
  AddToCollectionAction,
  AddMultipleToCollectionAction,
} from '../../store/actions/collections.actions';
import { getSampleBook, mockBooks } from '../../test/test.helper';

import { CollectionsComponent } from './collections.component';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MaterialModule,
        StoreModule.forRoot(reducerMapper),
        EffectsModule.forRoot([BooksEffects]),
        SharedModule,
      ],
      declarations: [CollectionsComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test(`No items in collections`, () => {
    expect(
      fixture.debugElement.query(By.css('.collectionItemsBlock'))
    ).toBeFalsy();
  });

  test(`should book in collection`, () => {
    const collectionAction = new AddToCollectionAction(getSampleBook());
    component.getStoreRef().dispatch(collectionAction);
    expect(
      fixture.debugElement.query(By.css('.collectionItemsBlock'))
    ).toBeFalsy();
  });
});
