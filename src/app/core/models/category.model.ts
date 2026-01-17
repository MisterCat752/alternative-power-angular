export interface Category {
  id: number;
  name: string;
  slug: string;
  parentCategory: number | null;
  sortOrder: number;
  showInMenu: boolean;
  isActive: boolean;
  image: string | null;
}
