import {
  HttpClient,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
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
const data = require('../../assets/searchItemsMockData.json');

const facadeMock = {
  loaded$: of(data),
  loadAll: function (value) {
    return value;
  },
};

let httpClient: HttpClient;

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
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
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
    }).compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be able to load search page', () => {
    const spy = spyOn(httpClient, 'get');
    spy.and.returnValue(
      of(<HttpResponse<any>>{
        body: {},
      })
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should be able to submit form and get the search results', () => {
    const spy = spyOn(httpClient, 'get');
    spy.and.returnValue(
      of({
        items: data,
      })
    );
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should return error if same is returned from books api', () => {
    const spy = spyOn(httpClient, 'get');
    spy.and.returnValue(throwError(new Error('invalid scope')));
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to visit book details page', inject(
    [Router],
    (mockRouter: Router) => {
      spyOn(httpClient, 'get').and.returnValue(
        of({
          items: data,
        })
      );
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.showDetails({ id: 'abcd1234' });
      expect(spy).toHaveBeenCalled();
    }
  ));
});
