import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchFacade } from '../../store/search.facade';

@Component({
  selector: 'angular-app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any = null;
  constructor(private facade: SearchFacade, private router: Router) {}

  ngOnInit(): void {
    this.facade.myCart$.subscribe((data) => {
      this.cartItems = data;
    });
  }

  transformDesc(str: String) {
    return !!str && !!str.length && str.length > 200
      ? str.substr(0, 200) + '...'
      : str;
  }

  deleteCartItem(cardObj: any) {
    this.facade.removeFromCart(cardObj.id);
  }

  navigateToBuy() {
    this.router.navigate(['bill-desk', 'checkoutCart']);
  }

  trackByBookId(index: number, cardObj: any) {
    return cardObj.id;
  }
}
