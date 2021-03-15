// Angular Redux Modules
import { ActionReducerMap } from '@ngrx/store';

// Dev Definied Reducers
import { BooksListReducer } from './books.reducer';
import { APIErrorReducer } from './apiError.reducer';
import { SearchReducer } from './search.reducer';
import { cartReducer } from './cart.reducer';
import { MyCollectionReducer } from './collection.reducer';

export const reducerMapper: ActionReducerMap<any> = {
  booksList: BooksListReducer,
  apiError: APIErrorReducer,
  searchList: SearchReducer,
  cartList: cartReducer,
  myCollection: MyCollectionReducer,
};

export enum ReduceMappers {
  booksList = 'booksList',
  apiError = 'apiError',
  searchList = 'searchList',
  cartList = 'cartList',
  myCollection = 'myCollection',
}
