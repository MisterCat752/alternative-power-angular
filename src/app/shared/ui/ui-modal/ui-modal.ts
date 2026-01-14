import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
@Component({
  selector: 'app-ui-modal',
  standalone: true,
  imports: [],
  templateUrl: './ui-modal.html',
})
export class UiModal {
  @Input({ required: true }) open!: boolean;
  @Output() openChange = new EventEmitter<boolean>();

  close() {
    this.openChange.emit(false);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) {
      this.close();
    }
  }
}
