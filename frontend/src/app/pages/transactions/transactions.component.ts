import { Filter } from 'src/app/models/filter.model';
import { Transaction } from './../../models/transaction.model';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { FilterInputs } from 'src/app/shared/table/table.component';
import { TableService } from 'src/app/shared/table/table.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { IPage } from 'src/app/interfaces/page.interface';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, IPage {
  tableData: Transaction[] = [];
  total = 0;
  page = 1;

  filterInputs: FilterInputs[] = [
    {
      inputModel: { attr: 'tipo', value: '' },
      label: 'Tipo de transação',
      placeholder: 'Filtre pelo tipo da transação: Entrada ou Saída',
    },
  ];

  constructor(
    private transactionService: TransactionService,
    private tableService: TableService,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getItems(1);
  }

  getItems(
    page: number,
    filters?: Filter[],
    order: { attr: string; value: string } | null = null
  ) {
    this.tableService.setLoading({ type: 'transaction' }, true);
    let settedFilters = filters?.length
      ? { attr: filters[0].attr, value: filters[0].value }
      : null;

    this.transactionService
      .getAll(
        page,
        settedFilters || null,
        order || {
          attr: 'data',
          value: 'desc',
        }
      )
      .subscribe(
        (response) => {
          this.tableService.setTableData({ type: 'transaction' }, response);
          this.tableService.setLoading({ type: 'transaction' }, false);
        },
        (response) => {
          this.setAlertOrErrors(response);
          this.tableService.setLoading({ type: 'transaction' }, false);
        }
      );
  }

  onPagination(e: any) {
    this.getItems(e.page, e.filters, e.order);
  }

  onFilter(e: any) {
    this.getItems(e.page, e.filters, e.order);
  }

  onCreate(e: any) {
    this.router.navigate(['transactions/create']);
  }

  onEdit(e: any) {
    this.router.navigate(['transactions/edit'], {
      queryParams: { transacao: e.data.id },
    });
  }

  onDelete(e: any) {
    this.tableService.setLoading({ type: 'transaction' }, true);
    this.transactionService.delete(e.data.id).subscribe(
      (response) => {
        this.setAlertOrErrors(response);
        this.tableService.setLoading({ type: 'transaction' }, false);
        this.getItems(1);
      },
      (response) => {
        this.setAlertOrErrors(response);
        this.tableService.setLoading({ type: 'transaction' }, false);
      }
    );
  }

  setAlertOrErrors(response: any) {
    if (response.status == 'unauthenticated') {
      this.alertService.setMessage({
        title: 'Alerta',
        message: response.message,
        type: 'warning',
      });
      this.authService.removeToken();
      this.router.navigateByUrl('/login');
      return;
    } else if (response.status == 'validation') {
      let message = response.errors[Object.keys(response.errors)[0]];
      this.alertService.setMessage({
        title: 'Erro',
        message,
        type: 'warning',
      });
      return;
    } else if (response.status == 'not-found') {
      this.alertService.setMessage({
        title: 'Erro',
        message: response.message,
        type: 'warning',
      });
      this.location.back();
      return;
    } else if (response.status == 'error') {
      this.alertService.setMessage({
        title: 'Erro',
        message: response.message,
        type: 'danger',
      });
      this.location.back();
      return;
    } else if (response.status == 'success') {
      this.alertService.setMessage({
        title: 'Sucesso',
        message: response.message,
        type: 'success',
      });
      return;
    }
    this.alertService.setMessage({
      title: 'Erro',
      message: 'Deu algum erro no sistema',
      type: 'danger',
    });
    this.location.back();
    return;
  }
}
