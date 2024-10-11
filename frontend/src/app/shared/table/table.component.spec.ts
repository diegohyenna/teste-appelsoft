import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';

import { TableComponent } from './table.component';
import { TableService } from './table.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let tableServiceMock: any;

  beforeEach(async () => {
    tableServiceMock = {
      loading$: of({
        deliveries: false,
        driversSuccessful: false,
        driversUnsuccessful: false,
        neighborhood: false,
      }),
      tableData$: of({
        deliveries: { data: [], page: 1, size: 10, total: 0 },
        driversSuccessful: { data: [], page: 1, size: 10, total: 0 },
        driversUnsuccessful: { data: [], page: 1, size: 10, total: 0 },
        neighborhood: { data: [], page: 1, size: 10, total: 0 },
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [MatPaginatorModule],
      providers: [{ provide: TableService, useValue: tableServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns = ['col1', 'col2'];
    component.tableColumns = [];
    component.tableDataAttr = { type: 'deliveries' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data from TableService', () => {
    component.ngAfterContentChecked();
    fixture.detectChanges();

    expect(component.isLoading.deliveries).toBe(false);
    expect(component.tableData.deliveries).toEqual([]);
    expect(component.page).toBe(1);
    expect(component.size).toBe(10);
    expect(component.total).toBe(0);
  });

  it('should emit filter event with correct filters', () => {
    spyOn(component.onFilter, 'emit');

    component.filterInputs = [
      {
        label: 'Filter 1',
        placeholder: 'Enter value',
        inputModel: { attr: 'attr1', value: 'value1' },
      },
    ];

    component.filter();

    expect(component.onFilter.emit).toHaveBeenCalledWith({
      page: 1,
      size: 10,
      filters: [{ attr: 'attr1', value: 'value1' }],
    });
  });

  it('should emit pagination event with correct page and size', () => {
    spyOn(component.onPagination, 'emit');

    const pageEvent = { pageIndex: 1, pageSize: 10, length: 100 } as any;
    component.handlePageEvent(pageEvent);

    expect(component.onPagination.emit).toHaveBeenCalledWith({
      page: 2,
      size: 10,
      filters: [],
    });
  });

  it('should call paginator firstPage on filter', () => {
    component.paginator = {
      firstPage: jasmine.createSpy('firstPage'),
    } as any;

    component.filter();

    expect(component.paginator.firstPage).toHaveBeenCalled();
  });
});
