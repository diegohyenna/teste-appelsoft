import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TransactionPaginationReturn } from 'src/app/models/transaction-pagination-return.model';

export interface StateTable {
  transaction: TransactionPaginationReturn;
  inputs: TransactionPaginationReturn;
  outputs: TransactionPaginationReturn;
}

export interface StateTableTypes {
  type: 'transaction' | 'inputs' | 'outputs';
}

export interface StateLoadingTypes {
  type: 'transaction' | 'inputs' | 'outputs';
}

export interface LoadingTable {
  transaction: boolean;
  inputs: boolean;
  outputs: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private tableDataSubject = new BehaviorSubject<StateTable>({
    transaction: { data: [], page: 1, size: 10, total: 0, to: 0 },
    inputs: { data: [], page: 1, size: 10, total: 0, to: 0 },
    outputs: { data: [], page: 1, size: 10, total: 0, to: 0 },
  });

  private loadingSubject = new BehaviorSubject<LoadingTable>({
    transaction: false,
    inputs: false,
    outputs: false,
  });

  tableData$ = this.tableDataSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  setTableData(
    stateAttr: StateTableTypes,
    data: TransactionPaginationReturn
  ): void {
    this.tableDataSubject.value[stateAttr.type] = data;
  }

  setLoading(stateAttr: StateLoadingTypes, state: boolean): void {
    this.loadingSubject.value[stateAttr.type] = state;
  }
}
