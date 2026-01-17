export interface UnitOfMeasure {
  id: number;
  category: 'length' | 'weight' | 'quantity' | string;
  unitName: string;
  symbol: string;
  ratioToBase: number;
  continuousUnit: boolean;
  packagingUnit: boolean;
}
