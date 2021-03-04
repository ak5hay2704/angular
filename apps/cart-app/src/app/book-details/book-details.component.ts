import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { SearchFacade } from '../../store/search.facade';

@Component({
  selector: 'angular-app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private facade: SearchFacade,
    private router: Router
  ) {}
  id: string;
  selectedBook: any;
  cartData = [];
  colItems = [];
  ratingArr: Array<Number> = [1, 2, 3, 4, 5];

  ngOnInit(): void {
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
      .subscribe((data) => {
        this.selectedBook = data;
      });

    this.facade.myCart$.subscribe((data) => {
      this.cartData = data;
    });
    this.facade.myCollections$.subscribe((data) => {
      this.colItems = data;
    });
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

  addToCart(cardObj: any) {
    this.facade.addToCart(cardObj);
  }

  checkCart(cardObj) {
    if (this.cartData.length === 0) return false;
    const flag = this.cartData.filter((item) => item.id === cardObj.id);
    return flag.length > 0;
  }

  checkColItems(cardObj) {
    if (this.colItems.length === 0) return false;
    const flag = this.colItems.filter((item) => item.id === cardObj.id);
    return flag.length > 0;
  }

  navigateToBuy(id) {
    this.router.navigate(['bill-desk', id]);
  }
}
