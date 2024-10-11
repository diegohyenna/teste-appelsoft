import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPage } from 'src/app/interfaces/page.interface';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements IPage {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (response) => this.setAlertOrErrors(response),
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

  // Métodos auxiliares para mensagens de erro
  getEmailErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'O email é obrigatório';
    }
    return this.loginForm.get('email')?.hasError('email')
      ? 'Formato de email inválido'
      : '';
  }

  getSenhaErrorMessage() {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'A senha é obrigatória';
    }
    return '';
  }

  setAlertOrErrors(response: any): void {
    if (response.status == 'validation') {
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
      return;
    } else if (response.status == 'error') {
      this.alertService.setMessage({
        title: 'Erro',
        message: response.message,
        type: 'danger',
      });
      return;
    } else if (response.status == 'success') {
      this.alertService.setMessage({
        title: 'Sucesso',
        message: response.message,
        type: 'success',
      });
      this.router.navigateByUrl('/home');
      return;
    }
    this.alertService.setMessage({
      title: 'Erro',
      message: 'Deu algum erro no sistema',
      type: 'danger',
    });
    return;
  }
}
