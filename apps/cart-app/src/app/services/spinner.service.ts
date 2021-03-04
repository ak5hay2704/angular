import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private loader$ = new BehaviorSubject(false);
  loaderState = this.loader$.asObservable();

  constructor() {}

  show() {
    this.loader$.next(true);
  }

  hide() {
    this.loader$.next(false);
  }
}
