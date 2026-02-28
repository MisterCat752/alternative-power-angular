import { Category } from '../models/category.model';

export const CATEGORIES_MOCK: Category[] = [
  // ---------- INVERTERS ----------
  {
    id: 1,
    name: 'Inverters',
    slug: 'inverters',
    parentCategory: null,
    sortOrder: 1,
    showInMenu: true,
    isActive: true,
    image: null,
  },
  {
    id: 2,
    name: 'Deye Inverters',
    slug: 'deye-inverters',
    parentCategory: 1,
    sortOrder: 1,
    showInMenu: true,
    isActive: true,
    image: null,
  },

  // ---------- SOLAR ----------
  {
    id: 3,
    name: 'Solar Panels',
    slug: 'solar-panels',
    parentCategory: null,
    sortOrder: 2,
    showInMenu: true,
    isActive: true,
    image: null,
  },
  {
    id: 4,
    name: 'Longi Solar Panels',
    slug: 'longi-panels',
    parentCategory: 3,
    sortOrder: 1,
    showInMenu: true,
    isActive: true,
    image: null,
  },

  // ---------- BATTERIES ----------
  {
    id: 5,
    name: 'Batteries',
    slug: 'batteries',
    parentCategory: null,
    sortOrder: 3,
    showInMenu: true,
    isActive: true,
    image: null,
  },
  {
    id: 6,
    name: 'Deye Batteries',
    slug: 'deye-batteries',
    parentCategory: 5,
    sortOrder: 1,
    showInMenu: true,
    isActive: true,
    image: null,
  },
  {
    id: 8,
    name: 'V-TAC Batteries',
    slug: 'vtac-batteries',
    parentCategory: 5,
    sortOrder: 3,
    showInMenu: true,
    isActive: true,
    image: null,
  },

  // ---------- ACCESSORIES ----------
  {
    id: 11,
    name: 'Accessories',
    slug: 'accessories',
    parentCategory: null,
    sortOrder: 5,
    showInMenu: true,
    isActive: true,
    image: null,
  },
  {
    id: 12,
    name: 'Cables',
    slug: 'accessories-cables',
    parentCategory: 11,
    sortOrder: 1,
    showInMenu: true,
    isActive: true,
    image: null,
  },
];
