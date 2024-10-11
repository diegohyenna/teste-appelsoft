import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ITransaction } from './transaction.interface';
import { TransactionReturn } from '../models/transaction-return.model';
import { TransactionPaginationReturn } from '../models/transaction-pagination-return.model';
import { Transaction } from '../models/transaction.model';
import { ResumeReturn } from '../models/resume-return.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService implements ITransaction {
  public baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  getAll(
    page: number,
    filter: { attr: string; value: string } | null,
    order: { attr: string; value: string } | null
  ): Observable<TransactionPaginationReturn> {
    let url = `${this.baseUrl}/transacoes?page=${page}`;
    url = this.addFilterInBaseUrl(url, filter?.attr, filter?.value);
    url = this.addOrderInBaseUrl(url, order?.attr, order?.value);
    return this.http.get<TransactionPaginationReturn>(url).pipe(
      catchError((error: any) => {
        return this.setError(error);
      })
    );
  }

  getById(transactionId: string): Observable<TransactionReturn> {
    return this.http
      .get<TransactionReturn>(this.baseUrl + '/transacoes/' + transactionId)
      .pipe(
        catchError((error: any) => {
          return this.setError(error);
        })
      );
  }

  save(transactionData: Transaction): Observable<TransactionReturn> {
    return this.http
      .post<TransactionReturn>(this.baseUrl + '/transacoes/', {
        ...transactionData,
      })
      .pipe(
        catchError((error: any) => {
          return this.setError(error);
        })
      );
  }

  update(transactionData: Transaction): Observable<TransactionReturn> {
    return this.http
      .put<TransactionReturn>(
        this.baseUrl + '/transacoes/' + transactionData.id,
        {
          ...transactionData,
        }
      )
      .pipe(
        catchError((error: any) => {
          return this.setError(error);
        })
      );
  }

  delete(transactionId: string): Observable<TransactionReturn> {
    return this.http
      .delete<TransactionReturn>(this.baseUrl + '/transacoes/' + transactionId)
      .pipe(
        catchError((error: any) => {
          return this.setError(error);
        })
      );
  }

  resume(): Observable<ResumeReturn> {
    return this.http.get<ResumeReturn>(this.baseUrl + '/resumo').pipe(
      catchError((error: any) => {
        return this.setError(error);
      })
    );
  }

  private addFilterInBaseUrl(baseUrl: string, filter?: string, value?: string) {
    return filter ? `${baseUrl}&${filter}=${value}` : baseUrl;
  }

  private addOrderInBaseUrl(baseUrl: string, order?: string, value?: string) {
    return order ? `${baseUrl}&ordenarPor=${order}&direcao=${value}` : baseUrl;
  }

  private setError(error: any) {
    if ([400, 401, 404, 422].includes(error.status))
      return throwError({ ...error.error });
    return throwError(error);
  }
}
