import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
  @Input() inputs = 0;
  @Input() outputs = 0;
  balance = 0;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['Entradas', 'Saídas', 'Saldo'];
  public pieChartDatasets = [
    {
      data: [this.inputs, this.outputs, this.balance],
      backgroundColor: ['#66bb6a', '#ef5350', '#42a5f5'],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnChanges(changes: any): void {
    this.inputs = changes?.inputs?.currentValue;
    this.outputs = changes?.outputs?.currentValue;
    this.balance = this.inputs - this.outputs;
    this.pieChartDatasets = [
      {
        data: [this.inputs, this.outputs, this.balance],
        backgroundColor: ['#66bb6a', '#ef5350', '#42a5f5'],
      },
    ];
  }
}
