import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '../services/http-client.service';
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
    private http: HttpClientService,
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
    });
  }

  onSubmit() {
    this.spinnerService.show();
    const searchKey = this.searchForm.value;
    this.http.get(searchKey.searchInput).subscribe(
      (data) => {
        this.spinnerService.hide();
        /* istanbul ignore else */
        if (!!data && !!data.items) {
          const payload = {
            data: data.items,
            key: searchKey.searchInput,
          };
          this.facade.loadAll(payload);
        }
      },
      (error) => {
        this.spinnerService.hide();
        console.log(error);
      }
    );
  }

  transformDesc(str: String) {
    return !!str && !!str.length && str.length > 80
      ? str.substr(0, 120) + '...'
      : str;
  }

  showDetails(cardObj: any) {
    this.router.navigate(['search', cardObj.id]);
  }

  trackByBookId(index: number, cardObj: any) {
    return cardObj.id;
  }
}
