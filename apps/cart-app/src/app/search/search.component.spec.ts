import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SearchComponent } from './search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SearchFacade } from '../../store/search.facade';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { SpinnerService } from '../services/spinner.service';
import { NGXLogger } from 'ngx-logger';
const data = require('../../assets/searchItemsMockData.json');

const facadeMock = {
  loaded$: of(data),
  loadAll: function (value) {
    return value;
  },
};

const Logger = {
  debug: function (value) {
    console.log(value);
  },
  error: function (value) {
    console.log(value);
  },
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'abcd1234' }),
          },
        },
        { provide: SearchFacade, useValue: facadeMock },
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
        MatInputModule,
        MatCardModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be able to load search page', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to submit form and call facade for dispatching load action', inject(
    [SpinnerService],
    (spinner: SpinnerService) => {
      const spy = spyOn(spinner, 'show');
      component.onSubmit();
      expect(spy).toHaveBeenCalled();
    }
  ));

  it('should be able to visit book details page', inject(
    [Router],
    (mockRouter: Router) => {
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.showDetails('abcd1234');
      expect(spy).toHaveBeenCalled();
    }
  ));
});
