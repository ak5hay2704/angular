import { LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchFacade } from '../../store/search.facade';
import { BookDetailsComponent } from './book-details.component';
import { NGXLogger } from 'ngx-logger';
const data = require('../../assets/searchItemsMockData.json');
const cartMock = require('../../assets/cartMockData.json');
const collectionsMock = require('../../assets/collectionsMockData.json');


const facadeMock = {
  loaded$: of(data, []),
  myCart$: of(cartMock),
  myCollections$: of(collectionsMock),
  addToCart: function (items) {
    return items;
  },
};

const Logger = {
  debug: function (value) {
    console.log(value);
  },
  error: function (value) {
    console.log(value);
  },
};

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      providers: [
        { provide: SearchFacade, useValue: facadeMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '0oWMBAAAQBAJ' }, { id: 'abcd1234' }),
          },
        },
        { provide: NGXLogger, useValue: Logger },
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be able to filter data thru id to get the book details', () => {
    expect(component.cartData.length).toBeGreaterThan(0);
    expect(component.colItems.length).toBeGreaterThan(0);
    expect(component.selectedBook).not.toBeNull();
    expect(component).toBeTruthy();
  });

  it('should be able to navigate to search page if invalid book id is supplied', () => {
    expect(component.cartData.length).toBeGreaterThan(0);
    expect(component.colItems.length).toBeGreaterThan(0);
    expect(component.selectedBook).toBeUndefined();
    expect(component).toBeTruthy();
  });

  it('should be able to visit cart page', inject(
    [Router],
    (mockRouter: Router) => {
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.navigateToBuy({ id: 'abcd1234' });
      expect(spy).toHaveBeenCalled();
    }
  ));

  it('should be able to add to cart', inject([SearchFacade], (facade: SearchFacade) => {
    const spy = spyOn(facade, 'addToCart');
    component.addToCart({ id: 'abcd1234' });
    expect(spy).toHaveBeenCalled();
    expect(component).toBeTruthy();
  }));

  it('should be able to show data properly on authors section', () => {
    const str = component.concatStr(['test', '12345']);
    expect(str.length).toBeGreaterThan(0);
    expect(str).toBeTruthy();
    expect(str).toBe('test and 12345');
  });

  it('should be able to return proper string if only one author is available', () => {
    const str = component.concatStr(['test']);
    expect(str.length).toBeGreaterThan(0);
    expect(str).toBeTruthy();
    expect(str).toBe('test');
  });

  it('should be able to show ratings properly', () => {
    const className = component.showIcon(3, 4);
    expect(className).toBe('star');
    expect(component).toBeTruthy();
  });

  it('should be able to show negative ratings properly', () => {
    const className = component.showIcon(3, 3);
    expect(className).toBe('star_border');
    expect(component).toBeTruthy();
  });

  it('should be able to check cart items already added', () => {
    const flag = component.checkCart({ id: 'abcd1234' });
    expect(component.cartData.length).toBeGreaterThan(0);
    expect(flag).toBe(false);
    expect(component).toBeTruthy();
  });

  it('should be able to check my collection items', () => {
    const flag = component.checkColItems({ id: 'abcd1234' });
    expect(component.colItems.length).toBeGreaterThan(0);
    expect(flag).toBe(false);
    expect(component).toBeTruthy();
  });
});
