import { Transaction } from './transaction.model';
export type TransactionPaginationReturn = {
  page: number;
  data: Transaction[];
  total: number;
  size: number;
  to: number;
};
