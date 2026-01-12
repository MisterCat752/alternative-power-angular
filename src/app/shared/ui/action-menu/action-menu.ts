import { Component, Input, Output, EventEmitter, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiActionItem } from './action.types';

@Component({
  selector: 'ui-action-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-menu.html',
})
export class ActionMenu {
  @Input({ required: true }) actions: UiActionItem[] = [];

  @Output() action = new EventEmitter<string>();

  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  onAction(item: UiActionItem) {
    if (item.disabled) return;

    if (item.type !== 'link' && item.action) {
      this.action.emit(item.action);
      this.close();
    }
  }

  // закрытие по клику вне меню
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.ui-action-menu')) {
      this.close();
    }
  }
}
