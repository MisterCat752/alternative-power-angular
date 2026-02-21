import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ActionMenu } from '../../../../shared/ui/action-menu/action-menu';
import { WarrantyService } from '../../../../core/services/warranty.service';
import { Warranty } from '../../../../core/models/warranty.model';

@Component({
  selector: 'app-warranties-page',
  standalone: true,
  imports: [RouterLink, ActionMenu],
  templateUrl: './warranties-page.html',
})
export class WarrantiesPage implements OnInit {
  private service = inject(WarrantyService);
  private router = inject(Router);

  rows: Warranty[] = [];

  ngOnInit() {
    this.service.listWarranties().subscribe((data) => {
      this.rows = data;
    });
  }

  handleAction(row: Warranty, action: string) {
    if (action === 'view') {
      console.log('view', row);
    }

    if (action === 'edit') {
      this.router.navigate(['/dashboard/catalog/warranties/edit', row.id]);
    }

    if (action === 'delete') {
      this.service.deleteWarranty(row.id).subscribe(() => {
        this.rows = this.rows.filter((r) => r.id !== row.id);
      });
    }
  }
}
