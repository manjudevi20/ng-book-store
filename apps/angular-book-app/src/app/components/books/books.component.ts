import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Book } from '../../interfaces/book/book';
// Store related Modules
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
//store actions
import { FetchBooks } from '../../store/actions/book.actions';
import { AddToSearchListAction } from '../../store/actions/search.actions';
import { ReduceMappers } from '../../store/reducers/mapper';
import { selectCartIds } from '../../store/reducers/cart.reducer';
import { selectCollectionIds } from '../../store/reducers/collection.reducer';

@Component({
  selector: 'prokarma-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  public bookSearch: FormGroup;
  public errorMessage: string;
  public booksList: Book[];

  public recentSearchs: string[];
  public cartItemIds: string[] | number[];
  public collectionIds: string[] | number[];
  private sub: Subscription[] = [];

  constructor(
    private store: Store<{
      booksList: Book[];
      apiError: any;
      cartList: any;
      searchList: string[];
    }>
  ) {
    this.bookSearch = new FormGroup({
      bookName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ]),
    });
  }

  ngOnInit(): void {
    this.errorMessage = '';
    this.sub.push(this.store
      .pipe(select(ReduceMappers.booksList))
      .subscribe((newBooksList: Book[]) => {
        this.booksList = newBooksList;
      })
    );
    this.sub.push(this.store
      .select(ReduceMappers.apiError)
      .subscribe((errMessage) => {
        /* istanbul ignore else */
        if (errMessage != null) {
          this.errorMessage = 'Error in fetching books data';
        }
      })
    );
    this.sub.push(this.store
      .select(ReduceMappers.searchList)
      .subscribe((searchList) => {
        this.recentSearchs = searchList;
      })
    );
    this.sub.push(this.store.select(selectCartIds).subscribe((ids) => {
      this.cartItemIds = ids;
    })
    );
    this.sub.push(this.store
      .select(selectCollectionIds)
      .subscribe((ids) => {
        this.collectionIds = ids;
      })
    );
  }

  // function used to get the books searched by user
  getBooks() {
    if (this.bookSearch.valid && this.bookSearch.value.bookName) {
      this.errorMessage = '';
      this.booksList = [];

      // calling search action to store all the search list
      const searchAction = new AddToSearchListAction(
        this.bookSearch.value.bookName
      );
      this.store.dispatch(searchAction);

      // calling fetch Action which linked to effects
      const fetchAction = new FetchBooks(this.bookSearch.value.bookName);
      this.store.dispatch(fetchAction);
    } else {
      this.errorMessage = 'Please enter a valid search text';
    }
  }

  getStoreRef(): Store<{
    booksList: Book[];
    apiError: any;
    cartList: any;
    searchList: string[];
  }> {
    return this.store;
  }

  ngOnDestroy() {
    this.sub.forEach(s => s.unsubscribe());
  }
}
