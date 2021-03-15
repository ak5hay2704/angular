import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchFacade } from '../../store/search.facade';
import { NGXLogger } from 'ngx-logger';
import { Book } from '../models/book.model';

@Component({
  selector: 'angular-app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Array<Book> = null;
  sub: Subscription;
  constructor(
    private facade: SearchFacade,
    private router: Router,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.sub = this.facade.myCart$.subscribe(
      (data) => {
        this.cartItems = data;
      },
      (error) => {
        this.logger.error('Error Occured with: ' + error);
      }
    );
  }

  deleteCartItem(id: string) {
    this.facade.removeFromCart(id);
  }

  navigateToBuy() {
    this.router.navigate(['bill-desk', 'checkoutCart']);
  }

  trackByBookId(index: number, cardObj: any) {
    return cardObj.id;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
