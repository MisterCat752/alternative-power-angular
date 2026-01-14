import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  computed,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Тип одной опции селекта
 */
export type UiSelectOption<T = string> = {
  label: string; // текст, который видит пользователь
  value: T; // реальное значение (id, enum и т.п.)
  hint?: string; // дополнительный текст
  icon?: 'check'; // иконка (опционально)
};

@Component({
  selector: 'ui-select',
  standalone: true,
  templateUrl: './ui-select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UiSelect,
      multi: true,
    },
  ],
})
export class UiSelect<T = any> implements ControlValueAccessor {
  /**
   * ===== INPUTS / OUTPUTS =====
   */
  @Input() placeholder = 'Select';
  @Input() options: UiSelectOption<T>[] = [];

  @Output() valueChange = new EventEmitter<T>();

  @Input() value: T | null = null;
  private _value = signal<T | null>(null);

  selected = computed(() => this.options.find((o) => o.value === this._value()));

  /**
   * ===== UI STATE =====
   */
  open = signal(false);
  disabled = false;

  // callbacks от Angular Forms
  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef<HTMLElement>) {}

  /**
   * ===== UI LOGIC =====
   */
  toggle() {
    if (this.disabled) return;
    this.open.set(!this.open());
  }

  pick(v: T) {
    this._value.set(v);
    this.onChange(v);
    this.onTouched();
    this.valueChange.emit(v);
    this.open.set(false);
  }

  // ControlValueAccessor
  writeValue(value: T): void {
    this._value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Закрытие дропдауна по клику вне компонента
   */
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.open()) return;

    const target = e.target as Node | null;

    if (target && !this.el.nativeElement.contains(target)) {
      this.open.set(false);
    }
  }
}
