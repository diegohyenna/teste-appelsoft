import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formateDate } from 'src/app/helpers/helpers';
import { IPage } from 'src/app/interfaces/page.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss'],
})
export class TransactionEditComponent implements IPage {
  transacaoForm: FormGroup = this.fb.group({
    id: [''],
    tipo: ['', [Validators.required]],
    descricao: ['', [Validators.required, Validators.maxLength(255)]],
    valor: [
      '',
      [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
      ],
    ],
    data: ['', [Validators.required]],
  });

  tipos = ['Entrada', 'Saída'];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private alertService: AlertService,
    private transactionService: TransactionService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('transacao');
      if (id == null || id == '') {
        return this.setAlertOrErrors({
          status: 'id-not-found',
          message: 'O identificador da transação não foi encontrado!',
        });
      }
      this.transactionService.getById(id).subscribe(
        (result) => {
          if (
            result.data &&
            !Array.isArray(result.data) &&
            result.data.data != null
          ) {
            this.transacaoForm.patchValue({
              ...result.data,
              data: new Date(result?.data?.data),
            });
          } else {
            return this.setAlertOrErrors({
              status: 'not-found',
              message: 'Os dados da transação não foram encontrados!',
            });
          }
        },
        (response) => {
          this.setAlertOrErrors(response);
        }
      );
    });
  }

  onSubmit() {
    if (this.transacaoForm.valid) {
      let formValues = this.transacaoForm.value;

      formValues.data = formateDate(formValues.data);

      this.transactionService.update(formValues).subscribe(
        (response) => {
          this.setAlertOrErrors(response);
        },
        (response) => {
          this.setAlertOrErrors(response);
        }
      );
    } else {
      this.alertService.setMessage({
        message: 'Formulário com campos inválidos!',
        type: 'warning',
        title: 'Erro',
      });
    }
  }

  // Métodos para exibir mensagens de erro
  getErrorMessage(field: string): string {
    const control = this.transacaoForm.get(field);

    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    if (control?.hasError('maxlength')) {
      return 'Máximo de 255 caracteres';
    }

    if (control?.hasError('min')) {
      return 'O valor não pode ser negativo';
    }

    if (control?.hasError('pattern')) {
      return 'Formato numérico inválido';
    }

    return '';
  }

  goBack() {
    this.location.back();
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
        type: 'danger',
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
      this.router.navigateByUrl('/transactions');
      return;
    } else if (response.status == 'id-not-found') {
      this.alertService.setMessage({
        title: 'Erro',
        message: response.message,
        type: 'danger',
      });
      this.location.back();
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
