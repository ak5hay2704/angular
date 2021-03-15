import { LayoutModule } from '@angular/cdk/layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { CartComponent } from './cart.component';
import { NGXLogger } from 'ngx-logger';
const cartMock = require('../../assets/cartMockData.json');

const facadeMock = {
  myCart$: of(cartMock),
  removeFromCart: function (id) {
    return id;
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

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: SearchFacade, useValue: facadeMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'abcd1234' }),
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
        MatCardModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be able to load cart items', () => {
    expect(component.cartItems.length).toBeGreaterThan(0);
    expect(component).toBeTruthy();
  });

  it('should be able to delete item from cart', inject(
    [SearchFacade],
    (facade: SearchFacade) => {
      const spy = spyOn(facade, 'removeFromCart');
      component.deleteCartItem('abcd1234');
      expect(spy).toHaveBeenCalled();
      expect(component).toBeTruthy();
    }
  ));

  it('should be able to proceed to buy items from cart', inject(
    [Router],
    (mockRouter: Router) => {
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.navigateToBuy();
      expect(spy).toHaveBeenCalled();
      expect(component).toBeTruthy();
    }
  ));
});
