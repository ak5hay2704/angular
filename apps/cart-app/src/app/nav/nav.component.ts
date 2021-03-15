import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';
import { SearchFacade } from '../../store/search.facade';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'angular-app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isLoading: Observable<boolean> = this.spinnerService.loaderState;
  badgeVal: number;
  badgeColVal: number;
  subs: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private spinnerService: SpinnerService,
    private facade: SearchFacade,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.facade.cartSize$.subscribe(
        (data) => {
          this.badgeVal = data;
        },
        (error) => {
          this.logger.error('Error Occured with: ' + error);
        }
      )
    );
    this.subs.push(
      this.facade.collectionsSize$.subscribe(
        (size) => {
          this.badgeColVal = size;
        },
        (error) => {
          this.logger.error('Error Occured with: ' + error);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
