import { AfterContentChecked, Component, OnInit } from '@angular/core';

import { Alert, AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, AfterContentChecked {
  alert: Alert | undefined;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.setAlert();
    this.alertService.alert$.subscribe(() => this.setAlert());
  }

  ngAfterContentChecked(): void {
    this.setAlert();
  }

  setAlert() {
    let alert: any = localStorage.getItem('alert') || undefined;
    if (alert) {
      alert = JSON.parse(alert) as Alert | undefined;

      setTimeout(() => {
        this.onClosed();
      }, 5000);
    }
    this.alert = alert;
  }

  onClosed() {
    localStorage.removeItem('alert');
    this.alert = undefined;
  }
}
