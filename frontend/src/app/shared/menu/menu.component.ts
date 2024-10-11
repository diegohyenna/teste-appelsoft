import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user?: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((response) => {
      if (response instanceof NavigationEnd) {
        this.authService.me().subscribe((response) => {
          this.user = response;
        });
      }
    });
  }

  logout() {
    this.authService.logout(this.user.id).subscribe(
      () => {
        this.router.navigateByUrl('/login');
        this.user = undefined;
      },
      () => {
        this.alertService.setMessage({
          title: 'Erro',
          message: 'Ocorreu um erro ao efetuar logout',
          type: 'danger',
        });
      }
    );
  }
}
