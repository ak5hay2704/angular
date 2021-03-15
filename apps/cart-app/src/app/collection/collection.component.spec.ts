import { LayoutModule } from '@angular/cdk/layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchFacade } from '../../store/search.facade';
import { CollectionComponent } from './collection.component';
import { NGXLogger } from 'ngx-logger';
const collectionsMock = require('../../assets/collectionsMockData.json');

const facadeMock = {
  myCollections$: of(collectionsMock),
};

const Logger = {
  debug: function (value) {
    console.log(value);
  },
  error: function (value) {
    console.log(value);
  },
};

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionComponent],
      providers: [
        { provide: SearchFacade, useValue: facadeMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'abcd1234' }),
          },
        },
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be able to load my collection items and load collections page', () => {
    expect(component.colItems.length).toBeGreaterThan(0);
    expect(component).toBeTruthy();
  });

  it('should be able to navigate details page', inject(
    [Router],
    (mockRouter: Router) => {
      const navigateSpy = spyOn(mockRouter, 'navigate').and.stub();
      component.showDetails({ id: 'abcd1234' });
      expect(navigateSpy).toHaveBeenCalled();
      expect(component).toBeTruthy();
    }
  ));
});
