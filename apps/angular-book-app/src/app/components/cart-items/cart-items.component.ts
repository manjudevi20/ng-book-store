import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RemoveBookFromCartAction } from '../../store/actions/cart.actions';
import { selectAllCartItems } from '../../store/reducers/cart.reducer';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Book } from '../../interfaces/book/book';
import { Address } from '../../interfaces/book/address';

@Component({
  selector: 'prokarma-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent implements OnInit, OnDestroy {
  public cartDetails: Book[];
  public cartValue: number;

  private clearCartDetails: boolean;
  private sub: Subscription[] = [];

  constructor(
    private store: Store<{
      CartState;
      CollectionState;
      addressList: Address[];
    }>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clearCartDetails = false;
    this.sub.push(this.store
      .select(selectAllCartItems)
      .subscribe((cartData) => {
        this.cartDetails = cartData;
        this.calculateCartValue();
      })
    );
  }

  //remove book from cart
  removeBookFromCart(bookId: string) {
    const cartAction = new RemoveBookFromCartAction(bookId);
    this.store.dispatch(cartAction);
  }

  // calculating sum of cart items price
  calculateCartValue() {
    this.cartValue = this.cartDetails.reduce((totalValue, cartObj) => {
      return totalValue + cartObj.price;
    }, 0);
  }

  payNow() {
    this.router.navigate(['/billing-info']);
  }

  getStoreObj(): Store<{ CartState; CollectionState; addressList: Address[] }> {
    return this.store;
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }
}
