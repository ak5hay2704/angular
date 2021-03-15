import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../models/book.model';

@Component({
  selector: 'angular-app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input('bookObj') card: Book;
  @Input('transForm') descLength: number;
  @Output() bookClick = new EventEmitter<string>();
  @Input('showDeleteOption') showDeleteIcon = false;
  @Output() deleteItem = new EventEmitter<string>();
  @Input('showUserDetails') showDetailsSection = false;
  @Input('maxFooter') showMaxFooter = false;

  constructor() {}

  ngOnInit(): void {}

  transformDesc(str: String) {
    return !!str && !!str.length && str.length > this.descLength
      ? str.substr(0, this.descLength) + '...'
      : str;
  }

  showDetails(bookObj: Book) {
    this.bookClick.emit(bookObj.id);
  }

  deleteCartItem(bookObj: Book) {
    this.deleteItem.emit(bookObj.id);
  }
}
