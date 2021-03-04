import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SearchFacade } from './search.facade';
import { Store } from '@ngrx/store';
const data = require('../assets/searchItemsMockData.json');

let facade: SearchFacade;
const storeMock = {
  select: function () {
    return of(data);
  },
  dispatch: function (value) {
    return value;
  },
};

describe('Search Facade Service', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [SearchFacade, { provide: Store, useValue: storeMock }],
    });
    facade = TestBed.inject(SearchFacade);
  });

  it('should load the results data in store', inject([Store], (store: Store) => {
    const spy = spyOn(store, 'dispatch').and.stub();
    facade.loadAll(data);
    expect(spy).toHaveBeenCalled();
  }));

  it('should be able to add item to cart', inject([Store], (store: Store) => {
    const spy = spyOn(store, 'dispatch').and.stub();
    facade.addToCart({});
    expect(spy).toHaveBeenCalled();
  }));

  it('should be able to remove item from cart', inject([Store], (store: Store) => {
    const spy = spyOn(store, 'dispatch').and.stub();
    facade.removeFromCart('abcd1234');
    expect(spy).toHaveBeenCalled();
  }));

  it('should be able to add user details to the collection', inject([Store], (store: Store) => {
    const spy = spyOn(store, 'dispatch').and.stub();
    facade.attachBillingInfo({});
    expect(spy).toHaveBeenCalled();
  }));

  it('should be able checkout all items in the cart', inject([Store], (store: Store) => {
    const spy = spyOn(store, 'dispatch').and.stub();
    facade.checkOutCart();
    expect(spy).toHaveBeenCalled();
  }));

  it('should be able to add item to the collections',  inject([Store], (store: Store) => {
    const spy = spyOn(store, 'dispatch').and.stub();
    facade.addToCollection('abcd1234');
    expect(spy).toHaveBeenCalled();
  }));
});
