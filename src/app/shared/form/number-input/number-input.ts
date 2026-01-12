import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  imports: [],
  templateUrl: './number-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberInput,
      multi: true,
    },
  ],
})
export class NumberInput implements ControlValueAccessor {
  value: number | null = null;
  disabled = false;

  onChange = (v: number | null) => {};
  onTouched = () => {};

  writeValue(v: number | null) {
    this.value = v;
  }

  registerOnChange(fn: (v: number | null) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  handleInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    this.onChange(raw ? +raw : null);
  }
}
