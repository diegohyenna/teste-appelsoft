import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface FormErrors {
  type: string;
  message: string;
}
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) value!: string;
  @Input() formErrors?: FormErrors[] | undefined;
  @Input() validators?: any;

  inputFormControl!: any;

  ngOnInit() {
    if (this.validators)
      this.inputFormControl = new FormControl(this.value, ...this.validators);
    else this.inputFormControl = new FormControl(this.value);
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.inputFormControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.inputFormControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
