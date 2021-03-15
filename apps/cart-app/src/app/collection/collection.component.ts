import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchFacade } from '../../store/search.facade';
import { NGXLogger } from 'ngx-logger';
import { Book } from '../models/book.model';

@Component({
  selector: 'angular-app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit, OnDestroy {
  colItems: Array<Book> = [];
  sub: Subscription;
  constructor(
    private facade: SearchFacade,
    private router: Router,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.sub = this.facade.myCollections$.subscribe(
      (data) => {
        this.colItems = data;
      },
      (error) => {
        this.logger.error('Error Occured with: ' + error);
      }
    );
  }

  showDetails(cardObj: any) {
    this.router.navigate(['search', cardObj.id]);
  }

  trackByBookId(index: number, cardObj: any) {
    return cardObj.id;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
