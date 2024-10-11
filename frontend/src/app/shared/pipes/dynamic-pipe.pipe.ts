import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'dynamicPipe',
})
export class DynamicPipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
    private currencyCasePipe: CurrencyPipe
  ) {}

  transform(value: any, pipeName: string, pipeArgs?: any): any {
    switch (pipeName) {
      case 'date':
        return this.datePipe.transform(value, pipeArgs || 'shortDate');
      case 'currency':
        return this.currencyCasePipe.transform(value, pipeArgs);
      default:
        return value;
    }
  }
}
