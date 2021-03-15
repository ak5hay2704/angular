import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { SearchFacade } from '../../store/search.facade';
import { NGXLogger } from 'ngx-logger';
import { Book } from '../models/book.model';

@Component({
  selector: 'angular-app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent implements OnInit, OnDestroy {
  id: any;
  billForm = new FormGroup({
    fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    number: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private facade: SearchFacade,
    private dialog: MatDialog,
    private router: Router,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        concatMap((params) => {
          this.id = params.id;
          return this.facade.loaded$.pipe(
            map((data: Array<Book>) => {
              if (!!data && data.length > 0) {
                const flag = data.filter((item) => item.id === this.id);
                if (!!flag && flag.length === 1) {
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            })
          );
        })
      )
      .subscribe(
        (flag) => {
          /* istanbul ignore else */
          if (this.id !== 'checkoutCart' && !!flag)
            this.router.navigate(['search']);
        },
        (error) => {
          this.logger.error('Error Occured with: ' + error);
        }
      );
  }

  onSubmit() {
    const dialogRef = this.dialog.open(BillingSuccessDialog);
    dialogRef.afterClosed().subscribe((result) => {
      this.facade.attachBillingInfo(this.billForm.value);
      if (this.id === 'checkoutCart') {
        this.facade.checkOutCart();
      } else {
        this.facade.addToCollection(this.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

@Component({
  selector: 'angular-app-billing-success-dialog',
  templateUrl: 'billing-success-dialog.html',
  styles: [
    `
      .btn_dial {
        background-color: #673ab7;
        color: #fff;
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
          0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        border-width: 1px;
        margin: 0;
        min-width: 64px;
        line-height: 25px;
        padding: 0 16px;
        border-radius: 4px;
        overflow: visible;
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
})
export class BillingSuccessDialog {
  constructor(public dialogRef: MatDialogRef<BillingSuccessDialog>) {}
  onNoClick() {
    this.dialogRef.close();
  }
}
