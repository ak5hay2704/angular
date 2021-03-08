import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { SearchFacade } from '../../store/search.facade';

@Component({
  selector: 'angular-app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    searchInput: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private spinnerService: SpinnerService,
    private facade: SearchFacade,
    private router: Router
  ) {}
  result: Array<any> = [];
  showCards = false;
  ngOnInit(): void {
    this.facade.loaded$.subscribe((data) => {
      /* istanbul ignore else */
      if (!!data) {
        this.result = data;
        this.showCards = true;
      }
      this.spinnerService.hide();
    });
  }

  onSubmit() {
    this.spinnerService.show();
    const searchKey = this.searchForm.value;
    this.facade.loadAll(searchKey.searchInput);
  }

  showDetails(id: string) {
    this.router.navigate(['search', id]);
  }

  trackByBookId(index: number, cardObj: any) {
    return cardObj.id;
  }
}
