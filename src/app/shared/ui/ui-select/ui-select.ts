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
import { NgClass } from '@angular/common';

export type UiSelectOption<T = string> = {
  label: string;
  value: T;
  hint?: string; // справа или мелкий текст
  icon?: 'check'; // для "In stock only"
};

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-select.html',
})
export class UiSelect<T = any> {
  @Input() placeholder = 'Select';
  @Input() options: UiSelectOption<T>[] = [];

  // текущее значение
  @Input() value!: T;
  @Output() valueChange = new EventEmitter<T>();

  open = signal(false);

  selected = computed(() => this.options.find((o) => o.value === this.value));

  toggle() {
    this.open.set(!this.open());
  }

  pick(v: T) {
    this.valueChange.emit(v);
    this.open.set(false);
  }

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.open()) return;
    const target = e.target as Node | null;
    if (target && !this.el.nativeElement.contains(target)) this.open.set(false);
  }
}
