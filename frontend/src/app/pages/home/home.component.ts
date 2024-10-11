import { Resume } from './../../models/resume.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthService } from 'src/app/services/auth.service';
import { IPage } from 'src/app/interfaces/page.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TableService } from 'src/app/shared/table/table.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, IPage {
  resume?: Resume | null;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private alertService: AlertService,
    private location: Location,
    private router: Router,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.transactionService.resume().subscribe(
      (response) => {
        this.resume = response.data || null;
      },
      (response) => {
        this.setAlertOrErrors(response);
      }
    );

    this.getInputs(1);
    this.getOutputs(1);
  }

  getInputs(page: number) {
    this.tableService.setLoading({ type: 'inputs' }, true);
    this.transactionService
      .getAll(page, { attr: 'tipo', value: 'Entrada' }, null)
      .subscribe((response) => {
        this.tableService.setTableData({ type: 'inputs' }, response);
        this.tableService.setLoading({ type: 'inputs' }, false);
      });
  }
  getOutputs(page: number) {
    this.tableService.setLoading({ type: 'outputs' }, true);
    this.transactionService
      .getAll(page, { attr: 'tipo', value: 'Saída' }, null)
      .subscribe((response) => {
        this.tableService.setTableData({ type: 'outputs' }, response);
        this.tableService.setLoading({ type: 'outputs' }, false);
      });
  }

  onPaginationInputs(e: any) {
    this.getInputs(e.page);
  }

  onPaginationOutputs(e: any) {
    this.getOutputs(e.page);
  }

  setAlertOrErrors(response: any): void {
    if (response.status == 'unauthenticated') {
      this.alertService.setMessage({
        title: 'Alerta',
        message: response.message,
        type: 'warning',
      });
      this.authService.removeToken();
      this.router.navigateByUrl('/login');
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
