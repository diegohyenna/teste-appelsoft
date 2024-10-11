import { Observable } from 'rxjs';
import { TransactionPaginationReturn } from '../models/transaction-pagination-return.model';
import { TransactionReturn } from '../models/transaction-return.model';
import { Transaction } from '../models/transaction.model';
import { ResumeReturn } from '../models/resume-return.model';

export interface ITransaction {
  baseUrl: string;
  getAll(
    page: number,
    filter: { attr: string; value: string } | null,
    order: { attr: string; value: string } | null
  ): Observable<TransactionPaginationReturn>;
  getById(transactionId: string): Observable<TransactionReturn>;
  save(transactionData: Transaction): Observable<TransactionReturn>;
  update(transactionData: Transaction): Observable<TransactionReturn>;
  delete(userId: string): Observable<TransactionReturn>;
  resume(): Observable<ResumeReturn>;
}
