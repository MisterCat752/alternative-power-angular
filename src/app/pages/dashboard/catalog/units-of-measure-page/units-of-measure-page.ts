import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { UnitOfMeasureService } from '../../../../core/services/unit-of-measure.service';
import { UnitOfMeasure } from '../../../../core/models/unit-of-measure.model';

type UomRow = {
  id: number;
  name: string;
  category: string;
  symbol: string;
  ratioToBase: number;
  type: 'CONTINUOUS' | 'DISCRETE';
};

@Component({
  selector: 'app-units-of-measure-page',
  standalone: true,
  imports: [RouterLink, ActionMenu],
  templateUrl: './units-of-measure-page.html',
})
export class UnitsOfMeasurePage implements OnInit {
  private service = inject(UnitOfMeasureService);
  private router = inject(Router);

  rows = signal<UomRow[]>([]);
  sortAsc = signal(true);

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.listUnits().subscribe((units) => {
      this.rows.set(units.map((u) => this.mapRow(u)));
    });
  }

  mapRow(u: UnitOfMeasure): UomRow {
    return {
      id: u.id,
      name: u.unitName,
      category: u.category.toUpperCase(),
      symbol: u.symbol,
      ratioToBase: u.ratioToBase,
      type: u.continuousUnit ? 'CONTINUOUS' : 'DISCRETE',
    };
  }

  sortedRows = computed(() => {
    const rows = [...this.rows()];

    rows.sort((a, b) =>
      this.sortAsc() ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );

    return rows;
  });

  fmtRatio(n: number) {
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6,
    });
  }

  handleAction(row: UomRow, action: string) {
    if (action === 'edit') {
      this.router.navigate(['/dashboard/catalog/units-of-measure/edit', row.id]);
    }

    if (action === 'delete') {
      if (!confirm('Delete unit?')) return;

      this.service.deleteUnit(row.id).subscribe(() => {
        this.load();
      });
    }

    if (action === 'view') {
      console.log('view', row);
    }
  }
}
