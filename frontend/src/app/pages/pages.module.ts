import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SharedModule } from '../shared/shared.module';
import { TransactionCreateComponent } from './transactions/create/transaction-create.component';
import { TransactionEditComponent } from './transactions/edit/transaction-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    TransactionsComponent,
    TransactionCreateComponent,
    TransactionEditComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HomeComponent,
    LoginComponent,
    TransactionsComponent,
    TransactionCreateComponent,
    TransactionEditComponent,
    NotFoundComponent,
  ],
})
export class PagesModule {}
