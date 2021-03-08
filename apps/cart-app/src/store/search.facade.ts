import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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

  loadSuccess(payLoad: any) {
    this.store.dispatch(
      new SearchActions.LoadSearchResultsSuccessAction(payLoad)
    );
  }

  addToCart(obj: any) {
    this.store.dispatch(new SearchActions.AddSelectedToCartAction(obj));
  }

  removeFromCart(id: string) {
    this.store.dispatch(new SearchActions.RemoveFromCartAction(id));
  }

  attachBillingInfo(info: any) {
    this.store.dispatch(new SearchActions.AttachBillingInfo(info));
  }

  checkOutCart() {
    this.store.dispatch(new SearchActions.CheckoutCart());
  }

  addToCollection(id: string) {
    this.store.dispatch(new SearchActions.AddSelectedToCollections(id));
  }
}
