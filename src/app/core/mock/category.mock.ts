// core/mock/category.mock.ts
import { Category } from '../models/category.model';

export const CATEGORIES_MOCK: Category[] = [
  {
    id: 1,
    name: 'Solar Panels',
    slug: 'solar-panels',
    parentCategory: null,
    sortOrder: 1,
    showInMenu: true,
    isActive: true,
    image: null,
  },
  {
    id: 2,
    name: 'Inverters',
    slug: 'inverters',
    parentCategory: null,
    sortOrder: 2,
    showInMenu: true,
    isActive: true,
    image: null,
  },
  {
    id: 3,
    name: 'Batteries',
    slug: 'batteries',
    parentCategory: null,
    sortOrder: 3,
    showInMenu: true,
    isActive: true,
    image: null,
  },
];
