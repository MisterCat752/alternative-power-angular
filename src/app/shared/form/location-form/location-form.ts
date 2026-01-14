import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryLocationsService } from '../../../core/services/locations/inventory-locations.service';
import {
  InventoryLocation,
  LocationUsage,
  LocationFormValue,
} from '../../../core/models/inventory-location.model';
import { UiSelect, UiSelectOption } from '../../ui/ui-select/ui-select';
import { FormField } from '../form-field/form-field';
import { TextInput } from '../text-input/text-input';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormField, TextInput, UiSelect],
  templateUrl: './location-form.html',
})
export class LocationForm implements OnChanges {
  private fb = inject(FormBuilder);
  private locationsService = inject(InventoryLocationsService);

  @Input() location: InventoryLocation | null = null;
  @Output() cancel = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  loading = false;
  error?: string;

  usageOptions: UiSelectOption<LocationUsage>[] = [
    { label: 'Internal', value: 'internal' },
    { label: 'Supplier', value: 'supplier' },
    { label: 'Customer', value: 'customer' },
    { label: 'Virtual', value: 'virtual' },
  ];

  parentOptions: UiSelectOption<number | null>[] = [{ label: 'Root', value: null }];

  form = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(32)]],
    name: ['', Validators.required],
    usage: ['internal' as LocationUsage, Validators.required],
    parent: [null as number | null],
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && this.location) {
      this.form.patchValue({
        code: this.location.code,
        name: this.location.name,
        usage: this.location.usage as LocationUsage,
        parent: typeof this.location.parent === 'number' ? this.location.parent : null,
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = undefined;

    const value = this.form.getRawValue() as LocationFormValue;
    // Логируем данные перед отправкой

    const req$ = this.location?.id
      ? this.locationsService.updateLocation(this.location.id, value)
      : this.locationsService.createLocation(value);

    req$.subscribe({
      next: () => this.saved.emit(),
      error: (err) => {
        this.error = err?.error?.detail ?? 'Something went wrong';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
