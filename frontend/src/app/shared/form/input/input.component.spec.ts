import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormErrors, InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.placeholder = 'Test Placeholder';
    component.value = 'Test Value';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize FormControl without validators', () => {
    component.ngOnInit();
    expect(component.inputFormControl instanceof FormControl).toBe(true);
    expect(component.inputFormControl.value).toBe('Test Value');
  });

  it('should initialize FormControl with validators', () => {
    const validators = [
      (control: FormControl) =>
        control.value.length > 5 ? null : { length: 'too short' },
    ];
    component.validators = validators;
    component.ngOnInit();

    expect(component.inputFormControl.validator).toBeTruthy();
    expect(component.inputFormControl.value).toBe('Test Value');
  });

  it('should call writeValue and update FormControl value', () => {
    component.ngOnInit();
    component.writeValue('New Value');

    expect(component.inputFormControl.value).toBe('New Value');
  });

  it('should register onChange function', () => {
    const fn = jasmine.createSpy('onChangeFn');
    component.ngOnInit();
    component.registerOnChange(fn);
    component.inputFormControl.setValue('Changed Value');
    expect(fn).toHaveBeenCalledWith('Changed Value');
  });

  it('should register onTouched function', () => {
    const fn = jasmine.createSpy('onTouchedFn');
    component.registerOnTouched(fn);
    component.onTouched();
    expect(fn).toHaveBeenCalled();
  });

  it('should display label and placeholder correctly', () => {
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(
      By.css('mat-label')
    ).nativeElement;
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;

    expect(labelElement.textContent).toContain('Test Label');
    expect(inputElement.getAttribute('placeholder')).toBe('Test Placeholder');
  });

  it('should display form errors if present', () => {
    const formErrors: FormErrors[] = [
      { type: 'required', message: 'This field is required' },
    ];
    const validators = [Validators.required];
    component.validators = validators;
    component.ngOnInit();
    component.writeValue('');
    fixture.detectChanges();
    component.formErrors = formErrors;

    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(
      By.css('.danger')
    ).nativeElement;

    expect(errorElement.textContent).toContain('This field is required');
  });

  it('should not display form errors if not present', () => {
    component.formErrors = undefined;
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorElement).toBeNull();
  });
});
