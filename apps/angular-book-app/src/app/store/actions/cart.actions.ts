// Angular redux modules
import { Action } from '@ngrx/store';

// Dev Models
import { Book } from '../../interfaces/book/book';

export enum CartActionTypes {
  Add = '[Cart] Add',
  // AddMultiple = '[Cart] AddMultiple',
  Remove = '[Cart] Remove',
  RemoveAll = '[Cart] RemoveAll',
  Update = '[Cart] Update',
}

export class CartAction implements Action {
  readonly type: string;
  bookObj?: Book;
  booksObj?: Book[];
  id?: string;
}

export class AddBookToCartAction implements CartAction {
  readonly type = CartActionTypes.Add;

  constructor(public bookObj: Book) {}
}

export class RemoveBookFromCartAction implements CartAction {
  readonly type = CartActionTypes.Remove;

  constructor(public id: string) {}
}

export class RemoveAllBooksFromCartAction implements CartAction {
  readonly type = CartActionTypes.RemoveAll;
}
