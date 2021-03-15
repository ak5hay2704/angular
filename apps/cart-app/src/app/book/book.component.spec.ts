import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BookComponent } from './book.component';
import { tap } from 'rxjs/operators';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to transform description', () => {
    component['descLength'] = 5;
    const str = component.transformDesc('testabcd12345');
    expect(str.length).toBe(5 + 3);
    expect(component).toBeTruthy();
  });

  it('should emit event when user clicks on a book', () => {
    component.showDetails({ id: 'test12345' });
    component['bookClick'].pipe(
      tap((data) => {
        expect(data).toBeTruthy();
      })
    );
  });

  it('should emit event when user wants to delete a book record from cart', () => {
    component.deleteCartItem({ id: 'test12345' });
    component['deleteItem'].pipe(
      tap((data) => {
        expect(data).toBeTruthy();
      })
    );
  });
});
