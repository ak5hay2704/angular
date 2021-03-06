import { LayoutModule } from '@angular/cdk/layout';
import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';
import { Observable, of, throwError } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { SearchFacade } from '../../store/search.facade';
import { MatBadgeModule } from '@angular/material/badge';
import { NGXLogger } from 'ngx-logger';

const facadeMock = {
  cartSize$: of(2),
  collectionsSize$: of(1),
};

const Logger = {
  debug: function (value) {
    console.log(value);
  },
  error: function (value) {
    console.log(value);
  },
};

let spinnerService: SpinnerService;

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NavComponent],
        providers: [
          { provide: SearchFacade, useValue: facadeMock },
          SpinnerService,
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
          MatBadgeModule,
          RouterTestingModule,
        ],
      }).compileComponents();
      spinnerService = TestBed.inject(SpinnerService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be able to load nav component', () => {
    spyOn(spinnerService, 'show').and.returnValue(null);
    spyOn(spinnerService, 'hide').and.returnValue(null);
    expect(component.badgeVal).toBeGreaterThan(0);
    expect(component.badgeColVal).toBeGreaterThan(0);
    expect(component).toBeTruthy();
  });

  it('should be able to log error if any', inject(
    [SearchFacade],
    (facade: SearchFacade) => {
      spyOn(facade, 'cartSize$').and.returnValue(
        throwError(new Error('mock error'))
      );
      spyOn(facade, 'collectionsSize$').and.returnValue(
        throwError(new Error('mock error'))
      );
      expect(component.badgeVal).toBeGreaterThan(0);
      expect(component.badgeColVal).toBeGreaterThan(0);
      expect(component).toBeTruthy();
    }
  ));
});
