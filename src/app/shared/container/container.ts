import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  imports: [NgClass],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container {
  @Input() className = '';
}
