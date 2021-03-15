import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { BooksComponent } from '../app/components/books/books.component';
import { BookDetailsComponent } from '../app/components/book-details/book-details.component';
import { PageNotFoundComponent } from '../app/components/page-not-found/page-not-found.component';

import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
  },
  {
    path: `bookdetails/:${environment.urlParams['bookdetails#']}`,
    component: BookDetailsComponent,
  },
  {
    path: 'cart-items',
    loadChildren: () =>
      import('./components/cart-items/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'collections',
    loadChildren: () =>
      import('./components/collections/collection.module').then(
        (m) => m.CollectionModule
      ),
  },
  {
    path: 'billing-info',
    loadChildren: () =>
      import('./components/billing-info/billing-info.module').then(
        (m) => m.BillingInfoModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
