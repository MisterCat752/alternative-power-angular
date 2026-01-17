// core/models/uom-category.model.ts
export interface UomCategory {
  id: number;
  name: string;
  baseUom: 'meter' | 'kilogram' | 'piece' | string;
}
