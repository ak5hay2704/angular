import { LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BillingInfoComponent } from './billing-info.component';
import { SearchFacade } from '../../store/search.facade';
const data = require('../../assets/searchItemsMockData.json');

const facadeMock = {
  loaded$: of(data, []),
  attachBillingInfo: function (details) {
    return details;
  },
  checkOutCart: function () {
    return {};
  },
  addToCollection: function (id) {
    return id;
  },
};

const dialogMock = {
  open: function (value) {
    return {
      afterClosed: function () {
        return of(true);
      },
    };
  },
};

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingInfoComponent],
      providers: [
        { provide: SearchFacade, useValue: facadeMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '0oWMBAAAQBAJ' }, { id: 'abcd1234' }),
          },
        },
        {
          provide: MatDialog,
          useValue: dialogMock,
        },
      ],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDialogModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be able to filter cart details and load billing info component', inject(
    [Router],
    (mockRouter: Router) => {
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      expect(component.id).toBe('abcd1234');
      expect(spy).not.toHaveBeenCalled();
      expect(component).toBeTruthy();
    }
  ));

  it('should be able to submit form with use details', inject(
    [Router],
    (mockRouter: Router) => {
      const spy = spyOn(mockRouter, 'navigate').and.stub();
      component.onSubmit();
      expect(component.id).toBe('abcd1234');
      expect(spy).not.toHaveBeenCalled();
      expect(component).toBeTruthy();
    }
  ));
});
