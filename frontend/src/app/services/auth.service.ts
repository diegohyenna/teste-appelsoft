import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthReturn } from '../models/auth-return.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthReturn> {
    return this.http
      .post<AuthReturn>(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          response.token && this.saveToken(response.token);
          return response;
        }),
        catchError((error) => {
          return this.setError(error);
        })
      );
  }

  logout(userId: string): Observable<AuthReturn> {
    return this.http.get<AuthReturn>(`${this.baseUrl}/logout/${userId}`).pipe(
      map((response) => {
        this.removeToken();
        return response;
      }),
      catchError((error) => {
        return this.setError(error);
      })
    );
  }

  me(): Observable<AuthReturn> {
    return this.http.get<AuthReturn>(`${this.baseUrl}/me`).pipe(
      catchError((error: any) => {
        return this.setError(error);
      })
    );
  }

  refresh(): Observable<Omit<AuthReturn, 'status' | 'message'>> {
    return this.http.get<AuthReturn>(`${this.baseUrl}/refresh`);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  saveToken(token: string): void {
    return sessionStorage.setItem('token', token);
  }

  removeToken(): void {
    return sessionStorage.removeItem('token');
  }

  private setError(error: any) {
    if ([401, 404, 422].includes(error.status))
      return throwError({ ...error.error });
    return throwError(error);
  }
}
