// core/models/filter.model.ts

export interface CategoryFilter {
  id: number;
  category: string; // slug категории (longi-panels)
  key: string;
  title: string;
  type: 'checkbox' | 'price';
  options: { label: string; value: string }[];
  isActive: boolean;
}
