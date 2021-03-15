import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { SearchFacade } from '../../store/search.facade';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { Book } from '../models/book.model';

@Component({
  selector: 'angular-app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm = new FormGroup({
    searchInput: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  result: Array<Book> = [];
  showCards = false;
  sub: Subscription;

  constructor(
    private spinnerService: SpinnerService,
    private facade: SearchFacade,
    private router: Router,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.sub = this.facade.loaded$.subscribe(
      (data) => {
        /* istanbul ignore else */
        if (!!data) {
          this.result = data;
          this.showCards = true;
        }
        this.spinnerService.hide();
      },
      (error) => {
        this.logger.error('Error Occured with: ' + error);
      }
    );
  }

  onSubmit() {
    this.spinnerService.show();
    const searchKey = this.searchForm.value;
    this.facade.loadAll(searchKey.searchInput);
  }

  showDetails(id: string) {
    this.router.navigate(['search', id]);
  }

  trackByBookId(index: number, cardObj: Book) {
    return cardObj.id;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
