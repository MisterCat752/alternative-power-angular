import { Component, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';

type Row = {
  sku: string;
  name: string;
  img?: string;
  invoice: number;
  landed: number;
  website: number;
  websiteMdl: number;
  curr: 'EUR' | 'MDL';
  category?: string;
  brand?: string;
  stock: number;
  invoiceCode?: string;
};

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [NgClass],
  templateUrl: './product-page.html',
})
export class ProductsPage {
  tab = signal<'all' | 'published' | 'drafts' | 'discount'>('all');
  search = signal('');

  rows = signal<Row[]>([
    {
      sku: '164397',
      name: '—',
      img: '',
      invoice: 100.65,
      landed: 120.78,
      website: 157.01,
      websiteMdl: 3099.46,
      curr: 'EUR',
      category: '—',
      brand: '—',
      stock: 72,
      invoiceCode: 'XN1313840C',
    },
    {
      sku: 'LR7-72HTHF',
      name: 'LONGI Solar Panel',
      img: 'https://picsum.photos/id/1060/80/80',
      invoice: 66.5,
      landed: 79.79,
      website: 103.73,
      websiteMdl: 2047.69,
      curr: 'EUR',
      category: '—',
      brand: 'LONGI',
      stock: 700,
      invoiceCode: 'R28335',
    },
    {
      sku: '921474',
      name: 'Inverter',
      img: '',
      invoice: 845.0,
      landed: 1014.0,
      website: 1318.2,
      websiteMdl: 26021.27,
      curr: 'EUR',
      category: '—',
      brand: '—',
      stock: 5,
      invoiceCode: 'R15894',
    },
  ]);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.rows().filter(
      (r) => !q || r.sku.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
    );
  });

  fmt(n: number) {
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
