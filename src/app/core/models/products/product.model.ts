// core/models/product.model.ts

export interface Product {
  id?: number; // optional, т.к. новый продукт еще не имеет id
  title: string;
  description: string;
  shortDescription?: string;
  image?: File | null; // если используем ImageInput
  sku?: string;
  quantity: number;
  price: number;
  category: string;
  brand?: string;
  productType: 'single' | 'bundle';
  pricing: ProductPricing;
  stock: ProductStock;
  settings: ProductSettings;

  specifications?: ProductSpecGroup[]; // 👈 НОВОЕ
}
export interface ProductSpecGroup {
  group: string; // Display / Storage / Audio / etc
  items: ProductSpecItem[];
}

export interface ProductSpecItem {
  label: string;
  value: string;
}
export interface ProductPricing {
  currency: string;
  listPrice?: number;
  installerPrice?: number;
  salePrice?: number;
  saleEndsAt?: Date | null;
  manualWebsitePrice?: number;
  websiteDiscount?: number;
  defaultMargin?: number;
  pricingProfile?: string | null;
  tva?: number | null;
  customs?: number | null;
  logistics?: number | null;
}

export interface ProductStock {
  baseUom: string;
  purchaseUom: string;
}

export interface ProductSettings {
  warranty?: string | null;
  invoice?: string;
  slug?: string;
  modelName?: string;
  published: boolean;
  internal: boolean;
  allowPreorder: boolean;
}
