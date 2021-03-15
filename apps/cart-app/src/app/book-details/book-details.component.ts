import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { SearchFacade } from '../../store/search.facade';
import { NGXLogger } from 'ngx-logger';
import { Book } from '../models/book.model';

@Component({
  selector: 'angular-app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private facade: SearchFacade,
    private router: Router,
    private logger: NGXLogger
  ) {}

  id: string;
  selectedBook: Book;
  cartData: Array<Book> = [];
  colItems: Array<Book> = [];
  ratingArr: Array<Number> = [1, 2, 3, 4, 5];
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs.push(
      this.route.params
        .pipe(
          concatMap((params) => {
            this.id = params.id;
            return this.facade.loaded$.pipe(
              map((data) => {
                if (!!data && data.length > 0) {
                  const flag = data.filter((item) => item.id === this.id);
                  if (!!flag && flag.length === 1) {
                    return flag[0];
                  } else {
                    this.router.navigate(['search']);
                  }
                } else {
                  this.router.navigate(['search']);
                }
              })
            );
          })
        )
        .subscribe(
          (data) => {
            this.selectedBook = data;
          },
          (error) => {
            this.logger.error('Error Occured with: ' + error);
          }
        )
    );

    this.subs.push(
      this.facade.myCart$.subscribe((data) => {
        this.cartData = data;
      })
    );
    this.subs.push(
      this.facade.myCollections$.subscribe((data) => {
        this.colItems = data;
      })
    );
  }

  showIcon(index: number, rating: Number) {
    if (rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  concatStr(arr: Array<string>) {
    if (arr.length === 1) {
      return arr[0];
    } else {
      let str = '';
      arr.forEach((item, idx) => {
        str = str + item;
        /* istanbul ignore else */
        if (idx < arr.length - 1) str += ' and ';
      });
      return str;
    }
  }

  addToCart(cardObj: Book) {
    this.facade.addToCart(cardObj);
  }

  checkCart(cardObj: Book) {
    if (this.cartData.length === 0) return false;
    const flag = this.cartData.filter((item) => item.id === cardObj.id);
    return flag.length > 0;
  }

  checkColItems(cardObj: Book) {
    if (this.colItems.length === 0) return false;
    const flag = this.colItems.filter((item) => item.id === cardObj.id);
    return flag.length > 0;
  }

  navigateToBuy(id: string) {
    this.router.navigate(['bill-desk', id]);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
