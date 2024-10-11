import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Filter } from 'src/app/models/filter.model';

import { FormErrors } from '../form/input/input.component';
import { LoadingTable, StateTableTypes, TableService } from './table.service';

export interface FilterInputs {
  label: string;
  placeholder: string;
  inputModel: {
    attr: string;
    value: any;
  };
  validators?: Validators[] | undefined;
  formErrors?: FormErrors[] | undefined;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterContentChecked {
  @Input({ required: true }) columns!: string[];
  @Input({ required: true }) tableColumns!: any[];
  @Input() filterInputs?: FilterInputs[];
  @Input() addCreateButton = false;

  isLoading: LoadingTable = {
    transaction: false,
    inputs: false,
    outputs: false,
  };

  tableData: any = {
    transacao: { data: [], page: 1, total: 0 },
  };

  @Input({ required: true }) tableDataAttr!: StateTableTypes;
  page = 1;
  size = 10;
  total = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output('onFilter') onFilter = new EventEmitter<{
    page: number;
    size: number;
    filters: Filter[];
    order: Filter;
  }>();
  @Output('onPagination') onPagination = new EventEmitter<{
    page: number;
    size: number;
    filters: Filter[];
    order: Filter;
  }>();
  @Output('onCreate') onCreate = new EventEmitter<{}>();
  @Output('onEdit') onEdit = new EventEmitter<{
    data: any;
  }>();
  @Output('onDelete') onDelete = new EventEmitter<{
    data: any;
  }>();

  filtersQueries: Filter[] = [];
  orderQueries: Filter = { attr: '', value: '' };

  constructor(private tableService: TableService) {}

  ngAfterContentChecked(): void {
    this.tableService.loading$.subscribe((loading) => {
      this.isLoading[this.tableDataAttr.type] =
        loading[this.tableDataAttr.type];
    });

    this.tableService.tableData$.subscribe((response) => {
      this.tableData[this.tableDataAttr.type] =
        response[this.tableDataAttr.type].data;
      this.size = response[this.tableDataAttr.type].to;
      this.page = response[this.tableDataAttr.type].page;
      this.total = response[this.tableDataAttr.type].total;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.onPagination.emit({
      page: e.pageIndex + 1,
      size: this.size,
      filters: this.filtersQueries,
      order: this.orderQueries,
    });
  }

  filter() {
    this.page = 1;
    this.paginator?.firstPage();
    this.filtersQueries = [];
    this.filterInputs?.map((input) => {
      if (input.inputModel.value) {
        this.filtersQueries.push({
          attr: input.inputModel.attr,
          value: input.inputModel.value,
        });
      }
    });

    this.onFilter.emit({
      page: this.page,
      size: this.size,
      filters: this.filtersQueries,
      order: this.orderQueries,
    });
  }

  order(sortState: Sort) {
    this.page = 1;
    this.paginator?.firstPage();
    this.orderQueries = { attr: sortState.active, value: sortState.direction };

    this.onFilter.emit({
      page: this.page,
      size: this.size,
      filters: this.filtersQueries,
      order: this.orderQueries,
    });
  }

  handleCreate() {
    this.onCreate.emit();
  }

  handleEdit(data: any) {
    this.onEdit.emit({ data });
  }

  handleDelete(data: any) {
    let response = window.confirm(
      'Voce tem certeza que deseja excluir este registro?'
    );
    if (response) {
      this.onDelete.emit({ data });
    }
  }
}
