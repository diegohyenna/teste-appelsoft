import { EventEmitter, Injectable } from '@angular/core';

export interface Alert {
  type: 'success' | 'warning' | 'danger';
  message: string;
  title?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert$ = new EventEmitter<boolean>();

  constructor() {}

  setMessage(alert: Alert) {
    localStorage.setItem(
      'alert',
      JSON.stringify({
        type: alert.type,
        message: alert.message,
        title: alert.title,
      })
    );
    this.alert$.emit(true);
  }
}
