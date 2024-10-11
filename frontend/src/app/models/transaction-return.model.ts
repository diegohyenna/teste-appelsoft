import { Transaction } from './transaction.model';

export type TransactionReturn = {
  status: string;
  message: string;
  data?: Transaction[] | Transaction | null | undefined;
};
