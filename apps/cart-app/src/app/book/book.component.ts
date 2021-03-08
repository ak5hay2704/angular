import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'angular-app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input('bookObj') card: any;
  @Input('transForm') descLength: number;
  @Output() bookClick = new EventEmitter<any>();
  @Input('showDeleteOption') showDeleteIcon: boolean = false;
  @Output() deleteItem = new EventEmitter<any>();
  @Input('showUserDetails') showDetailsSection: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  transformDesc(str: String) {
    return !!str && !!str.length && str.length > this.descLength
      ? str.substr(0, this.descLength) + '...'
      : str;
  }

  showDetails(bookObj: any) {
    this.bookClick.emit(bookObj.id);
  }

  deleteCartItem(bookObj: any) {
    this.deleteItem.emit(bookObj.id);
  }
}
