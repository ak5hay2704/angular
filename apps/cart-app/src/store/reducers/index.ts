import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromSearch from './search-reducer';

export interface RootReducerState {
  appState: fromSearch.SearchReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  appState: fromSearch.searchReducer,
};

//selector for root reducer

export const getSearchState = (state: RootReducerState) => state.appState;

export const getLoadedList = createSelector(
  getSearchState,
  fromSearch.getResults
);

export const getCartLength = createSelector(
  getSearchState,
  fromSearch.getCartLength
);

export const getCartData = createSelector(
  getSearchState,
  fromSearch.getCartData
);

export const getColLength = createSelector(
  getSearchState,
  fromSearch.getColLength
);

export const getCollections = createSelector(
  getSearchState,
  fromSearch.getCollections
);
