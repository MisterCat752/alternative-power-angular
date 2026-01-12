import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type Row = {
  name: string;
  baseUom: string; // "METER (M)"
};

@Component({
  selector: 'app-uom-categories-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './uom-categories-page.html',
})
export class UomCategoriesPage {
  rows: Row[] = [
    { name: 'Length', baseUom: 'METER (M)' },
    { name: 'Unit', baseUom: 'PIECE (PCS)' },
  ];
}
