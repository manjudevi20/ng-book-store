import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AddBookToCartAction } from '../../../app/store/actions/cart.actions';
import { selectCollectionIds } from '../../../app/store/reducers/collection.reducer';

//Models
import { Book } from '../../../app/interfaces/book/book';
import { ReduceMappers } from '../../../app/store/reducers/mapper';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'prokarma-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  private books: Book[];
  private selectedBookId: string;
  private cartList: any;
  public bookDetails: Book;
  public itemBought: boolean;
  public collectionIds: string[] | number[];
  private sub: Subscription[] = [];

  constructor(
    private store: Store<{ booksList: Book[]; cartList: any }>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemBought = false;
    this.sub.push(this.store
      .select(ReduceMappers.booksList)
      .subscribe((booksList) => {
        this.books = booksList;
      })
    );
    this.sub.push(this.store
      .select(ReduceMappers.cartList)
      .subscribe((cartList) => {
        this.cartList = cartList;
      })
    );
    this.sub.push(this.store
      .select(selectCollectionIds)
      .subscribe((ids) => {
        this.collectionIds = ids;
      })
    );

    // Fetching Id from URL
    this.selectedBookId = this.route.snapshot.paramMap.get(
      environment.urlParams['bookdetails#']
    );

    // Fetching selected book details
    /* istanbul ignore else */
    if (this.selectedBookId) {
      this.books.forEach((bookData) => {
        /* istanbul ignore else */
        if (bookData.id === this.selectedBookId) {
          this.bookDetails = bookData;
        }
      });
    }
    /* istanbul ignore else */
    if (!this.bookDetails) {
      this.router.navigate(['/']);
    }

    this.checkForItemInCart();
  }

  checkForItemInCart() {
    if (this.selectedBookId && this.cartList) {
      this.itemBought = this.cartList.ids.some((id) => {
        return id === this.selectedBookId;
      });
    } else {
      this.itemBought = false;
    }
  }

  setSelectedBookId(newId: string) {
    this.selectedBookId = newId;
  }

  addBookToCart() {
    const cartAction = new AddBookToCartAction(this.bookDetails);
    this.store.dispatch(cartAction);
    this.checkForItemInCart();
    this.router.navigate(['/cart-items']);
  }

  buyItem() {
    this.router.navigate(['/billing-info']);
  }

  setCartList(cartDetails) {
    this.cartList = cartDetails;
  }

  getStoreRef(): Store<{ booksList: Book[]; cartList: any }> {
    return this.store;
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }
}
