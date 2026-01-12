import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type UomRow = {
  name: string;
  category: string;
  symbol: string;
  ratioToBase: number;
  type: 'CONTINUOUS' | 'DISCRETE';
};

@Component({
  selector: 'app-units-of-measure-page',
  standalone: true,
  imports: [RouterLink],

  templateUrl: './units-of-measure-page.html',
})
export class UnitsOfMeasurePage {
  rows: UomRow[] = [
    { name: 'meter', category: 'Length', symbol: 'M', ratioToBase: 1.0, type: 'CONTINUOUS' },
    { name: 'piece', category: 'Unit', symbol: 'PCS', ratioToBase: 1.0, type: 'DISCRETE' },
  ];

  fmtRatio(n: number) {
    return n.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 });
  }
}
