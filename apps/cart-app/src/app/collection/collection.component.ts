import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchFacade } from '../../store/search.facade';

@Component({
  selector: 'angular-app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  colItems: Array<any> = [];
  constructor(private facade: SearchFacade, private router: Router) {}

  ngOnInit(): void {
    this.facade.myCollections$.subscribe((data) => {
      this.colItems = data;
    });
  }

  showDetails(cardObj: any) {
    this.router.navigate(['search', cardObj.id]);
  }

  trackByBookId(index: number, cardObj: any) {
    return cardObj.id;
  }
}
