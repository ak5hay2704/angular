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

  deleteCartItem(id: string) {
    this.facade.removeFromCart(id);
  }

  navigateToBuy() {
    this.router.navigate(['bill-desk', 'checkoutCart']);
  }

  trackByBookId(index: number, cardObj: any) {
    return cardObj.id;
  }
}
