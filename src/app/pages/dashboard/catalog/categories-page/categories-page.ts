import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { CategoryService } from '../../../../core/services/category.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [RouterLink, ActionMenu],
  templateUrl: './categories-page.html',
})
export class CategoriesPage implements OnInit {
  private service = inject(CategoryService);
  private router = inject(Router);

  rows: Category[] = [];

  ngOnInit() {
    this.service.list().subscribe((data) => {
      this.rows = data;
    });
  }

  handleAction(row: Category, action: string) {
    if (action === 'view') {
      console.log('view', row);
    }

    if (action === 'edit') {
      this.router.navigate(['/dashboard/catalog/categories/edit', row.id]);
    }

    if (action === 'delete') {
      this.service.delete(row.id).subscribe(() => {
        this.rows = this.rows.filter((c) => c.id !== row.id);
      });
    }
  }
}
