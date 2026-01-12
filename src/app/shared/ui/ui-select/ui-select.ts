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

  /**
   * Регистрируем компонент как FormControl
   * Это позволяет использовать formControlName
   */
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
   * Используются в режиме фильтров
   */

  @Input() placeholder = 'Select';
  @Input() options: UiSelectOption<T>[] = [];

  // controlled value (как value в React)
  @Input() value!: T;

  // событие для фильтров ([(value)])
  @Output() valueChange = new EventEmitter<T>();

  /**
   * ===== UI STATE =====
   */

  // открыт ли дропдаун
  open = signal(false);

  // текущая выбранная опция
  selected = computed(() => this.options.find((o) => o.value === this.value));

  /**
   * ===== CONTROL VALUE ACCESSOR =====
   * Эти методы вызываются Angular Forms
   */

  // состояние disabled (приходит из формы)
  disabled = false;

  // callbacks от Angular Forms
  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Angular вызывает, когда форма устанавливает значение
   * (edit, patchValue, reset и т.п.)
   */
  writeValue(value: T): void {
    this.value = value;
  }

  /**
   * Angular передаёт функцию,
   * которую нужно вызвать при изменении значения
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Angular передаёт функцию,
   * которую нужно вызвать при взаимодействии пользователя
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Angular вызывает при formControl.disable()
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * ===== UI LOGIC =====
   */

  toggle() {
    if (this.disabled) return;
    this.open.set(!this.open());
  }

  /**
   * Пользователь выбрал опцию
   */
  pick(v: T) {
    if (this.disabled) return;

    // обновляем локальное значение
    this.value = v;

    // 🔥 сообщаем Angular Forms
    this.onChange(v);
    this.onTouched();

    // 🔁 сообщаем фильтрам
    this.valueChange.emit(v);

    this.open.set(false);
  }

  /**
   * Закрытие дропдауна по клику вне компонента
   */
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.open()) return;

    const target = e.target as Node | null;

    if (target && !this.el.nativeElement.contains(target)) {
      this.open.set(false);
    }
  }
}
