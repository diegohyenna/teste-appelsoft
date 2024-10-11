import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/login')) {
      let authToken = this.authService.getToken();

      if (authToken == null) {
        this.router.navigateByUrl('/login');
        return next.handle(request);
      }
      const authReq = request.clone({
        body: request.body,
        headers: request.headers.set('Authorization', `Bearer ` + authToken),
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
