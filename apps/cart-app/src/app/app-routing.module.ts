import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { Routes } from '@angular/router';
import { URLS } from '../constants/constants';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './collection/collection.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: URLS.SEARCH, pathMatch: 'full' },
  { path: URLS.SEARCH, component: SearchComponent },
  { path: URLS.BOOK_DETAILS, component: BookDetailsComponent },
  { path: URLS.CART, component: CartComponent },
  { path: URLS.BILLDESK, component: BillingInfoComponent },
  { path: URLS.COLLECTION, component: CollectionComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
