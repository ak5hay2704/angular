import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClientService } from '../../app/services/http-client.service';
import * as SearchActions from '../actions/search-actions';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions, private http: HttpClientService) {}

  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(SearchActions.LOAD_SEARCH_RESULTS),
    mergeMap((data: any) => {
      return this.http.get(data.payload).pipe(
        map((books) => {
          const payload = {
            data: books.items,
            key: data.payload,
          };
          return new SearchActions.LoadSearchResultsSuccessAction(payload);
        }),
        catchError((error) => {
          return of(new SearchActions.LoadSearchResultsFailureAction(error));
        })
      );
    })
  );
}
