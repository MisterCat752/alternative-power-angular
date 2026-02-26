import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { CategoryFilterService } from '../../../../core/services/filter.service';
import { CategoryFilter } from '../../../../core/models/filter.model';

@Component({
  selector: 'app-filters-page',
  standalone: true,
  imports: [RouterLink, ActionMenu],
  templateUrl: './filters-page.html',
})
export class FiltersPage implements OnInit {
  private service = inject(CategoryFilterService);
  private router = inject(Router);

  rows: CategoryFilter[] = []; // все фильтры
  expandedFilterId = signal<number | null>(null); // открытый фильтр

  // пагинация
  pageSize = signal(5); // сколько фильтров на странице
  currentPage = signal(1);

  paginatedRows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.rows.slice(start, start + this.pageSize());
  });

  totalPages = computed(() => Math.ceil(this.rows.length / this.pageSize()));

  ngOnInit() {
    this.loadFilters();
  }

  loadFilters() {
    this.service.list().subscribe((data) => {
      this.rows = data;
      this.currentPage.set(1); // сбрасываем на первую страницу
    });
  }

  onView(row: CategoryFilter) {
    this.expandedFilterId.set(this.expandedFilterId() === row.id ? null : row.id);
  }

  handleAction(row: CategoryFilter, action: string) {
    if (action === 'edit') {
      this.router.navigate(['/dashboard/catalog/filters/edit', row.id]);
    }

    if (action === 'delete') {
      this.service.delete(row.id).subscribe(() => {
        this.rows = this.rows.filter((f) => f.id !== row.id);
        if (this.currentPage() > this.totalPages()) {
          this.currentPage.set(this.totalPages());
        }
      });
    }

    if (action === 'view') {
      this.onView(row);
    }
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }
}
