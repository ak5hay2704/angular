import { TestBed } from '@angular/core/testing';
import * as SearchActions from '../actions/search-actions';
import {
  getCartData,
  getCartLength,
  getCollections,
  getColLength,
  getResults,
  searchReducer,
} from './search-reducer';
const stateMock = require('../../assets/stateMock.json');
const bookMock = require('../../assets/bookMock.json');

describe('Search Reducer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [],
    });
  });

  it('should return the default state', () => {
    const defaultState = searchReducer(undefined, { type: 'default' });
    expect(defaultState.books).toBeFalsy();
    expect(defaultState.cartData.length).toBe(0);
    expect(defaultState.userDetails).toBeFalsy();
  });

  it('should load the results data in store', () => {
    const state = searchReducer(
      undefined,
      new SearchActions.LoadSearchResultsAction({ data: [{ id: 'abcd1234' }] })
    );
    expect(state.books).toBeFalsy();
  });

  it('should load the results data in store', () => {
    const state = searchReducer(
      undefined,
      new SearchActions.LoadSearchResultsSuccessAction({
        data: [{ id: 'abcd1234' }],
      })
    );
    expect(state.books).toBeTruthy();
    expect(state.books.length).toBe(1);
  });

  it('should load the results data in store', () => {
    const state = searchReducer(
      undefined,
      new SearchActions.LoadSearchResultsFailureAction({
        error: { error: 'invalid' },
      })
    );
    expect(state.error).toBeTruthy();
  });

  it('should be able to add item to cart', () => {
    const state = searchReducer(
      stateMock,
      new SearchActions.AddSelectedToCartAction(bookMock)
    );
    expect(state.cartData).toBeTruthy();
    expect(state.cartData.length).toBe(3);
    expect(state.cartSize).toBe(3);
  });

  it('should be able to remove item from cart', () => {
    const state = searchReducer(
      stateMock,
      new SearchActions.RemoveFromCartAction('pAmODwAAQBAJ')
    );
    expect(state.cartData).toBeTruthy();
    expect(state.cartData.length).toBe(1);
    expect(state.cartSize).toBe(1);
  });

  it('should be able to add user details to the collection', () => {
    const state = searchReducer(
      stateMock,
      new SearchActions.AttachBillingInfo({
        fName: 'Test',
        email: 'test12345@gmail.com',
        number: '9876543210',
        address: 'Test City, Test-444444',
      })
    );
    expect(state.userDetails).toBeTruthy();
    expect(state.userDetails.fName).toBe('Test');
    expect(state.userDetails.email).toBe('test12345@gmail.com');
    expect(state.userDetails.number).toBe('9876543210');
    expect(state.userDetails.address).toBe('Test City, Test-444444');
  });

  it('should be able checkout all items in the cart', () => {
    const state = searchReducer(
      stateMock,
      new SearchActions.CheckoutCart([{ id: 'abcd1234' }, { id: 'test12345' }])
    );
    expect(state.collections).toBeTruthy();
    expect(state.collections.length).toBe(4);
    expect(state.colSize).toBe(4);
  });

  it('should be able to add item to the collections', () => {
    const state = searchReducer(
      stateMock,
      new SearchActions.AddSelectedToCollections(bookMock)
    );
    expect(state.collections).toBeTruthy();
    expect(state.collections.length).toBe(3);
    expect(state.colSize).toBe(3);
  });

  it('should be retrieve selector callbacks', () => {
    const books = getResults(stateMock);
    expect(books).toBeTruthy();
    expect(books.length).toBe(10);
    const cartSize = getCartLength(stateMock);
    expect(cartSize).toBeTruthy();
    expect(cartSize).toBe(2);
    const colSize = getColLength(stateMock);
    expect(colSize).toBeTruthy();
    expect(colSize).toBe(2);
    const cartItems = getCartData(stateMock);
    expect(cartItems).toBeTruthy();
    expect(cartItems.length).toBe(2);
    const colItems = getCollections(stateMock);
    expect(colItems).toBeTruthy();
    expect(colItems.length).toBe(2);
  });
});
