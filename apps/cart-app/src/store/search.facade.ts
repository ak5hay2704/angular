import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book, UserDetails } from '../app/models/book.model';
import * as SearchActions from './actions/search-actions';
import * as SearchReducers from './reducers';

@Injectable()
export class SearchFacade {
  loaded$ = this.store.select(SearchReducers.getLoadedList);
  myCart$ = this.store.select(SearchReducers.getCartData);
  myCollections$ = this.store.select(SearchReducers.getCollections);
  cartSize$ = this.store.select(SearchReducers.getCartLength);
  collectionsSize$ = this.store.select(SearchReducers.getColLength);

  constructor(private store: Store) {}

  loadAll(searchInput: string) {
    this.store.dispatch(new SearchActions.LoadSearchResultsAction(searchInput));
  }

  loadSuccess(payLoad: Array<Book>) {
    this.store.dispatch(
      new SearchActions.LoadSearchResultsSuccessAction(payLoad)
    );
  }

  addToCart(obj: Book) {
    this.store.dispatch(new SearchActions.AddSelectedToCartAction(obj));
  }

  removeFromCart(id: string) {
    this.store.dispatch(new SearchActions.RemoveFromCartAction(id));
  }

  attachBillingInfo(info: UserDetails) {
    this.store.dispatch(new SearchActions.AttachBillingInfo(info));
  }

  checkOutCart() {
    this.store.dispatch(new SearchActions.CheckoutCart());
  }

  addToCollection(id: string) {
    this.store.dispatch(new SearchActions.AddSelectedToCollections(id));
  }
}
