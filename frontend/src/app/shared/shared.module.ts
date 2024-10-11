import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { ChartComponent } from './chart/chart.component';
import { InputComponent } from './form/input/input.component';
import { MenuComponent } from './menu/menu.component';
import { TableComponent } from './table/table.component';
import { TableService } from './table/table.service';
import { DynamicPipe } from './pipes/dynamic-pipe.pipe';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    MenuComponent,
    InputComponent,
    TableComponent,
    AlertComponent,
    ChartComponent,
    DynamicPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgChartsModule,
    MatNativeDateModule,
  ],
  providers: [TableService, AlertService, CurrencyPipe, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    MenuComponent,
    InputComponent,
    TableComponent,
    AlertComponent,
    ChartComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    NgChartsModule,
    MatNativeDateModule,
  ],
})
export class SharedModule {}
