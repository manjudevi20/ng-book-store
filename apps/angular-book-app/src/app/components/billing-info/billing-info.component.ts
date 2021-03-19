import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { RemoveAllBooksFromCartAction } from '../../store/actions/cart.actions';
import { selectAllCartItems } from '../../store/reducers/cart.reducer';
import { AddMultipleToCollectionAction } from '../../store/actions/collections.actions';
import { selectAllCollectionItems } from '../../store/reducers/collection.reducer';

import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Book } from '../../interfaces/book/book';
import { Address } from '../../interfaces/book/address';

import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'prokarma-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent implements OnInit, OnDestroy {
  public billingForm: FormGroup;
  public cartDetails: Book[];
  public expandAddressBlock: boolean;
  public cartValue: number;

  private clearCartDetails: boolean;
  private delivryAddress: Address;
  private sub: Subscription[] = [];

  constructor(
    private store: Store<{
      CartState;
      CollectionState;
      addressList: Address[];
    }>,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.billingForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[0-9]*'),
      ]),
      address: new FormControl('', Validators.required),
    });
    this.sub.push(this.store
      .select(selectAllCartItems)
      .subscribe((cartData) => {
        this.cartDetails = cartData;
      })
    );
    this.sub.push(this.store
      .select(selectAllCollectionItems)
      .subscribe(() => {
        if (this.clearCartDetails === true) {
          const cartAction = new RemoveAllBooksFromCartAction();
          this.store.dispatch(cartAction);

          this.clearCartDetails = false;
        }
      })
    );
  }

  payNow() {
    this.dialog.open(DialogComponent, {
      data: { message: 'Your order is placed successfully!' },
    });
    this.clearCartDetails = true;

    this.cartDetails = this.cartDetails.map((bookItem) => {
      bookItem = Object.assign({}, bookItem);
      this.delivryAddress = {
        billingName: this.billingForm.controls.name.value,
        billingEmail: this.billingForm.controls.email.value,
        billingMobile: this.billingForm.controls.mobileNo.value,
        billingAddress: this.billingForm.controls.address.value,
      };
      bookItem.deliveryAddress = Object.assign({}, this.delivryAddress);
      return bookItem;
    });

    const collectionAction = new AddMultipleToCollectionAction(
      this.cartDetails
    );

    this.store.dispatch(collectionAction);
    this.router.navigate(['/collections']);
  }

  getStoreObj(): Store<{ CartState; CollectionState; addressList: Address[] }> {
    return this.store;
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }
}
