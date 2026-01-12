import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-input',
  imports: [],
  templateUrl: './image-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageInput,
      multi: true,
    },
  ],
})
export class ImageInput implements ControlValueAccessor {
  file: File | null = null;
  preview: string | null = null;

  onChange = (v: File | null) => {};
  onTouched = () => {};

  writeValue(file: File | null) {
    this.file = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.preview = reader.result as string);
      reader.readAsDataURL(file);
    } else {
      this.preview = null;
    }
  }

  registerOnChange(fn: (v: File | null) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  pickFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0] ?? null;
    this.writeValue(file);
    this.onChange(file);
    this.onTouched();
  }
}
