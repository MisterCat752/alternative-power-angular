import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { BrandService } from '../../../../core/services/brand.service';
import { Brand } from '../../../../core/models/brand.model';

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

@Component({
  selector: 'app-brands-page',
  standalone: true,
  imports: [RouterLink, ActionMenu],
  templateUrl: './brands-page.html',
})
export class BrandsPage implements OnInit {
  private service = inject(BrandService);
  private router = inject(Router);

  rows: Brand[] = [];

  initials = initials;

  ngOnInit() {
    this.service.list().subscribe((data) => {
      this.rows = data;
    });
  }

  handleAction(row: Brand, action: string) {
    if (action === 'view') {
      console.log('view', row);
    }

    if (action === 'edit') {
      this.router.navigate(['/dashboard/catalog/brands/edit', row.id]);
    }

    if (action === 'delete') {
      this.service.delete(row.id).subscribe(() => {
        this.rows = this.rows.filter((b) => b.id !== row.id);
      });
    }
  }
}
