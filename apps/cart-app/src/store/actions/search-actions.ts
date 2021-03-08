export const LOAD_SEARCH_RESULTS = 'LOAD_SEARCH_RESULTS';
export const LOAD_SEARCH_RESULTS_SUCCESS = 'LOAD_SEARCH_RESULTS_SUCCESS';
export const LOAD_SEARCH_RESULTS_FAILURE = 'LOAD_SEARCH_RESULTS_FAILURE';
export const ADD_SELECTED_TO_CART = 'ADD_SELECTED_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_TO_COLLECTION = 'ADD_TO_COLLECTION';
export const CHECKOUT_CART = 'CHECKOUT_CART';
export const ATTACH_BILLING_DETAILS = 'ATTACH_BILLING_DETAILS';

export class LoadSearchResultsAction {
  readonly type = LOAD_SEARCH_RESULTS;
  constructor(public payload: any) {}
}

export class LoadSearchResultsSuccessAction {
  readonly type = LOAD_SEARCH_RESULTS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadSearchResultsFailureAction {
  readonly type = LOAD_SEARCH_RESULTS_FAILURE;
  constructor(public payload: any) {}
}
export class AddSelectedToCartAction {
  readonly type = ADD_SELECTED_TO_CART;
  constructor(public payload: any) {}
}

export class RemoveFromCartAction {
  readonly type = REMOVE_FROM_CART;
  constructor(public payload: any) {}
}

export class AddSelectedToCollections {
  readonly type = ADD_TO_COLLECTION;
  constructor(public payload: any) {}
}

export class CheckoutCart {
  readonly type = CHECKOUT_CART;
  constructor(public payload?: any) {}
}

export class AttachBillingInfo {
  readonly type = ATTACH_BILLING_DETAILS;
  constructor(public payload: any) {}
}
