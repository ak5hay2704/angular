import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';
import { SearchFacade } from '../../store/search.facade';

@Component({
  selector: 'angular-app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isLoading: Observable<boolean> = this.spinnerService.loaderState;
  badgeVal: number;
  badgeColVal: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private spinnerService: SpinnerService,
    private facade: SearchFacade
  ) {}

  ngOnInit(): void {
    this.facade.cartSize$.subscribe((data) => {
      this.badgeVal = data;
    });
    this.facade.collectionsSize$.subscribe((size) => {
      this.badgeColVal = size;
    });
  }
}
