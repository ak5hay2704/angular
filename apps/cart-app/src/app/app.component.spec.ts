import { LayoutModule } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFacade } from '../store/search.facade';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NGXLogger } from 'ngx-logger';

const Logger = {
  debug: function () {
    return console.log;
  },
  error: function () {
    return console.log;
  },
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavComponent],
      providers: [
        { provide: SearchFacade, useValue: {} },
        { provide: NGXLogger, useValue: Logger },
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatCardModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    TestBed.inject(SearchFacade);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cart-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cart-app');
  });
});
