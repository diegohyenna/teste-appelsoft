import { TestBed } from '@angular/core/testing';
import {
  TableService,
  StateTableTypes,
  StateLoadingTypes,
} from './table.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableService],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set table data', () => {
    const newData: any = {
      data: [{ id: 1, name: 'Test Delivery' }],
      page: 1,
      size: 10,
      total: 1,
    };
    const stateAttr: StateTableTypes = { type: 'deliveries' };

    service.setTableData(stateAttr, newData);

    service.tableData$.subscribe((data) => {
      expect(data.deliveries).toEqual(newData);
    });
  });

  it('should set loading state', () => {
    const stateAttr: StateLoadingTypes = { type: 'neighborhood' };
    const loadingState = true;

    service.setLoading(stateAttr, loadingState);

    service.loading$.subscribe((loading) => {
      expect(loading.neighborhood).toBeTrue();
    });
  });

  it('should initialize with default table data', () => {
    service.tableData$.subscribe((data) => {
      expect(data).toEqual({
        deliveries: { data: [], page: 1, size: 10, total: 0 },
        driversSuccessful: { data: [], page: 1, size: 10, total: 0 },
        driversUnsuccessful: { data: [], page: 1, size: 10, total: 0 },
        neighborhood: { data: [], page: 1, size: 10, total: 0 },
      });
    });
  });

  it('should initialize with default loading states', () => {
    service.loading$.subscribe((loading) => {
      expect(loading).toEqual({
        deliveries: false,
        driversSuccessful: false,
        driversUnsuccessful: false,
        neighborhood: false,
      });
    });
  });
});
