import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { UomCategoryService } from '../../../../core/services/uom-category/uom-category.service';
import { UomCategory } from '../../../../core/models/uom-category/uom-category.model';

type Row = {
  id: number;
  name: string;
  baseUom: string;
};

@Component({
  selector: 'app-uom-categories-page',
  standalone: true,
  imports: [RouterLink, ActionMenu],
  templateUrl: './uom-categories-page.html',
})
export class UomCategoriesPage implements OnInit {
  private service = inject(UomCategoryService);
  private router = inject(Router);

  rows = signal<Row[]>([]);
  sortAsc = signal(true);

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.listCategories().subscribe((categories) => {
      this.rows.set(categories.map((c) => this.mapRow(c)));
    });
  }

  mapRow(category: UomCategory): Row {
    return {
      id: category.id,
      name: category.name,
      baseUom: category.baseUom.toUpperCase(),
    };
  }

  sortedRows = computed(() => {
    const rows = [...this.rows()];

    rows.sort((a, b) =>
      this.sortAsc() ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );

    return rows;
  });

  toggleSort() {
    this.sortAsc.update((v) => !v);
  }

  handleAction(row: Row, action: string) {
    if (action === 'edit') {
      this.router.navigate(['/dashboard/catalog/uom-categories/edit', row.id]);
    }

    if (action === 'delete') {
      if (!confirm('Delete category?')) return;

      this.service.deleteCategory(row.id).subscribe(() => {
        this.load();
      });
    }

    if (action === 'view') {
      console.log('view', row);
    }
  }
}
