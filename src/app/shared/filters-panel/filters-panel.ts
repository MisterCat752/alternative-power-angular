import { Component, EventEmitter, Input, Output } from '@angular/core';

export type FilterOption = { label: string; value: string; count?: number };
export type FilterGroup = {
  key: string;
  title: string;
  type: 'checkbox' | 'price';
  options?: FilterOption[];
  opened?: boolean;
};

export type FiltersValue = Record<string, string[] | { min?: number; max?: number }>;

@Component({
  selector: 'app-filters-panel',
  standalone: true,
  templateUrl: './filters-panel.html',
})
export class FiltersPanelComponent {
  @Input({ required: true }) groups!: FilterGroup[];
  @Input() value: FiltersValue = {};
  @Output() valueChange = new EventEmitter<FiltersValue>();

  toggleGroup(g: FilterGroup) {
    g.opened = !g.opened;
  }

  isChecked(groupKey: string, optionValue: string): boolean {
    const v = this.value[groupKey];
    return Array.isArray(v) ? v.includes(optionValue) : false;
  }

  toggleCheck(groupKey: string, optionValue: string) {
    const current = this.value[groupKey];
    const arr = Array.isArray(current) ? [...current] : [];

    const idx = arr.indexOf(optionValue);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(optionValue);

    const next: FiltersValue = { ...this.value, [groupKey]: arr };
    this.valueChange.emit(next);
  }

  setPrice(groupKey: string, field: 'min' | 'max', val: string) {
    const num = val ? Number(val) : undefined;
    const cur = this.value[groupKey];
    const obj = !Array.isArray(cur) && cur ? { ...cur } : {};
    if (num === undefined || Number.isNaN(num)) delete (obj as any)[field];
    else (obj as any)[field] = num;

    const next: FiltersValue = { ...this.value, [groupKey]: obj };
    this.valueChange.emit(next);
  }

  clearAll() {
    this.valueChange.emit({});
  }
}
