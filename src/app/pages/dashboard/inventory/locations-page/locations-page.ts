import { Component, computed, inject, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { InventoryLocationsService } from '../../../../core/services/locations/inventory-locations.service';
import { InventoryLocation } from '../../../../core/models/inventory-location.model';
import { UiModal } from '../../../../shared/ui/ui-modal/ui-modal';
import { LocationForm } from '../../../../shared/form/location-form/location-form';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';

type UsageType = 'supplier' | 'customer' | 'virtual' | 'internal';
type Status = 'ACTIVE' | 'EMPTY';

type LocationRow = {
  id: number;
  code: string;
  name: string;
  usage: UsageType;
  parent: 'ROOT' | string | number | null;
  products: number;
  status: Status;
  is_active: boolean;
};

@Component({
  selector: 'app-locations-page',
  standalone: true,
  imports: [UiSelect, UiModal, LocationForm, ActionMenu],
  templateUrl: './locations-page.html',
})
export class LocationsPage {
  private locationsService = inject(InventoryLocationsService);

  open = signal(false);
  search = signal('');
  parent = signal<'ALL' | string>('ALL');
  usage = signal<'ALL' | UsageType>('ALL');

  rows = signal<LocationRow[]>([]);
  loading = signal(false);

  selectedLocation = signal<InventoryLocation | null>(null);
  mode = signal<'create' | 'edit' | 'delete'>('create');

  usageOpts: UiSelectOption<'ALL' | UsageType>[] = [
    { label: 'Usage Type', value: 'ALL' },
    { label: 'Internal', value: 'internal' },
    { label: 'Customer', value: 'customer' },
    { label: 'Supplier', value: 'supplier' },
    { label: 'Virtual', value: 'virtual' },
  ];

  parentOpts: UiSelectOption<'ALL' | string>[] = [
    { label: 'Parent Location', value: 'ALL' },
    { label: 'ROOT', value: 'ROOT' },
  ];

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.loading.set(true);
    this.locationsService.getLocations().subscribe({
      next: (data) => this.rows.set(this.mapApiToRows(data)),
      complete: () => this.loading.set(false),
    });
  }

  private mapApiToRows(data: InventoryLocation[]): LocationRow[] {
    return data.map((loc) => ({
      id: loc.id,
      code: loc.code,
      name: loc.name,
      usage: loc.usage.toLowerCase() as UsageType,
      parent: loc.parent ?? 'ROOT',
      products: loc.products ?? 0,
      status: loc.is_active ? 'ACTIVE' : 'EMPTY',
      is_active: loc.is_active,
    }));
  }

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.rows().filter((loc) => {
      const bySearch =
        !q || loc.code.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q);
      const byParent = this.parent() === 'ALL' ? true : (loc.parent ?? 'ROOT') === this.parent();
      const byUsage = this.usage() === 'ALL' ? true : loc.usage === this.usage();
      return bySearch && byParent && byUsage;
    });
  });

  totalCount = computed(() => this.rows().length);
  internalCount = computed(() => this.rows().filter((r) => r.usage === 'internal').length);
  supplierCount = computed(() => this.rows().filter((r) => r.usage === 'supplier').length);
  customerCount = computed(() => this.rows().filter((r) => r.usage === 'customer').length);
  virtualCount = computed(() => this.rows().filter((r) => r.usage === 'virtual').length);

  rowActions(loc: LocationRow) {
    return [
      { label: 'Edit', action: 'edit' },
      { label: 'Delete', danger: true, action: 'delete' },
    ];
  }

  onRowAction(action: string, loc: LocationRow) {
    const apiLoc: InventoryLocation = {
      id: loc.id,
      code: loc.code,
      name: loc.name,
      usage: loc.usage,
      parent: typeof loc.parent === 'number' ? loc.parent : null,
      is_active: loc.is_active,
    };

    this.selectedLocation.set(apiLoc);

    if (action === 'edit') {
      this.mode.set('edit');
      this.open.set(true);
    }

    if (action === 'delete') {
      this.mode.set('delete');
      this.open.set(true);
    }
  }

  deleteLocation(id?: number) {
    if (!id) return;
    this.loading.set(true);

    this.locationsService.deleteLocation(id).subscribe({
      next: () => {
        this.rows.set(this.rows().filter((r) => r.id !== id));
        this.open.set(false);
      },
      error: (err) => {
        console.error('Delete error', err);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
