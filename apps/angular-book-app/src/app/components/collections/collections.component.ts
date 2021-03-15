import { Component, OnInit, OnDestroy } from '@angular/core';

import { selectAllCollectionItems } from '../../store/reducers/collection.reducer';
import { Book } from '../../interfaces/book/book';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'prokarma-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit, OnDestroy {
  public booksCollection: Book[];
  private collectionSub: Subscription;

  constructor(private store: Store<{ CollectionState }>) {}

  ngOnInit(): void {
    // fetching store collections
    this.collectionSub = this.store
      .select(selectAllCollectionItems)
      .subscribe((collectionData) => {
        this.booksCollection = collectionData;
      });
  }

  getStoreRef(): Store<{ CollectionState }> {
    return this.store;
  }

  ngOnDestroy() {
    /* istanbul ignore else */
    if (this.collectionSub) {
      this.collectionSub.unsubscribe();
    }
  }
}
