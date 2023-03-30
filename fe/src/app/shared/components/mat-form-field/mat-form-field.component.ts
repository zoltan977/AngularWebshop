import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';

export interface DropDownListElementInterface {
  optionList: Observable<any[]>;
  getValue: (option: any) => any;
  getDisplayValue: (option: any) => any;
  optionSelected?: (event: MatAutocompleteSelectedEvent) => void;
  displayWith?: ((value: any) => string);
}

@Component({
  selector: 'custom-mat-form-field',
  templateUrl: './mat-form-field.component.html',
  styleUrls: ['./mat-form-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MatFormFieldComponent,
    multi: true
}]
})
export class MatFormFieldComponent implements ControlValueAccessor, OnInit {
  @Input('suffix') suffix: string | null = null;
  @Input('icon-suffix') iconSuffix: string | null = null;
  @Input('select') select: DropDownListElementInterface | null = null;
  @Input('auto-completer') autoCompleter: DropDownListElementInterface = {
    optionList: of([]),
    getValue: option => option,
    getDisplayValue: option => option,
  };
  @Input('placeholder') placeholder: string = "...";
  @Input('label') label: string = "Label";
  @Input('type') type: string = "text";
  @Input('password-strength') passwordStrength: boolean = false;
  innerType: string = this.type;

  errorsToArray(errors: Object | null) {
    return this.passwordStrength ? [] : Object.values(errors || {}).map(v => v.message || v);
  }

  toggleInnerType() {
    this.innerType === 'password' ? this.innerType = 'text' : this.innerType = 'password'
  }

  ngOnInit(): void {
    this.innerType = this.type;
  }

  @ViewChild(FormControlDirective, {static: true})
  formControlDirective!: FormControlDirective;

  @Input()
  formControl!: FormControl;

  @Input()
  formControlName!: string;

  constructor(private injector: Injector) {
  }

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  get control() {
    return this.formControl || this.controlContainer?.control?.get(this.formControlName);
  }
  
  registerOnTouched(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnTouched(fn);
  }
  
  registerOnChange(fn: any): void {
    this.formControlDirective?.valueAccessor?.registerOnChange(fn);
  }
  
  writeValue(obj: any): void {
    this.formControlDirective?.valueAccessor?.writeValue(obj);
  }
}

