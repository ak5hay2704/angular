import { Book, UserDetails } from '../../app/models/book.model';
import { Action } from '../actions';
import {
  ADD_SELECTED_TO_CART,
  ADD_TO_COLLECTION,
  ATTACH_BILLING_DETAILS,
  CHECKOUT_CART,
  LOAD_SEARCH_RESULTS,
  LOAD_SEARCH_RESULTS_FAILURE,
  LOAD_SEARCH_RESULTS_SUCCESS,
  REMOVE_FROM_CART,
} from '../actions/search-actions';

export interface SearchReducerState {
  books: Array<Book>;
  searchString: string;
  cartSize: number;
  cartData: Array<Book>;
  collections: Array<Book>;
  colSize: number;
  userDetails: UserDetails;
  recentSearches: Array<string>;
  error: any;
}

const initialState: SearchReducerState = {
  books: null,
  searchString: '',
  cartSize: 0,
  cartData: [],
  collections: [],
  colSize: 0,
  userDetails: null,
  recentSearches: [],
  error: null,
};

export function searchReducer(
  state = initialState,
  action: Action
): SearchReducerState {
  let updatedCart = [],
    updatedCartLength = 0,
    updateColLength = 0;
  switch (action.type) {
    case LOAD_SEARCH_RESULTS:
      return {
        ...state,
      };

    case LOAD_SEARCH_RESULTS_SUCCESS:
      const recents = state.recentSearches.concat(action.payload.key);
      return {
        ...state,
        books: action.payload.data,
        searchString: action.payload.key,
        recentSearches: recents,
      };

    case LOAD_SEARCH_RESULTS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case ADD_SELECTED_TO_CART:
      updatedCart = state.cartData.concat(action.payload);
      updatedCartLength = state.cartSize + 1;
      return {
        ...state,
        cartData: updatedCart,
        cartSize: updatedCartLength,
      };
    case REMOVE_FROM_CART:
      updatedCart = state.cartData.filter((item) => item.id !== action.payload);
      updatedCartLength = state.cartSize - 1;
      return {
        ...state,
        cartData: updatedCart,
        cartSize: updatedCartLength,
      };
    case ADD_TO_COLLECTION:
      const boughtBook = state.books.filter(
        (item) => item.id === action.payload
      );
      const result = { ...boughtBook[0], userDetails: state.userDetails };
      updateColLength = state.colSize + 1;
      return {
        ...state,
        collections: state.collections.concat(result),
        userDetails: null,
        colSize: updateColLength,
      };
    case CHECKOUT_CART:
      const res = state.cartData.map((item) => {
        const copy = { ...item };
        copy['userDetails'] = state.userDetails;
        return copy;
      });
      updateColLength = state.colSize + state.cartData.length;
      return {
        ...state,
        collections: state.collections.concat(res),
        cartData: [],
        cartSize: 0,
        colSize: updateColLength,
        userDetails: null,
      };
    case ATTACH_BILLING_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

//selectors

export const getResults = (state: SearchReducerState) => state.books;
export const getCartLength = (state: SearchReducerState) => state.cartSize;
export const getCartData = (state: SearchReducerState) => state.cartData;
export const getColLength = (state: SearchReducerState) => state.colSize;
export const getCollections = (state: SearchReducerState) => state.collections;
