import { UnitOfMeasure } from '../models/unit-of-measure.model';

export const UNITS_OF_MEASURE_MOCK: UnitOfMeasure[] = [
  {
    id: 1,
    category: 'length',
    unitName: 'Meter',
    symbol: 'm',
    ratioToBase: 1,
    continuousUnit: true,
    packagingUnit: false,
  },
  {
    id: 2,
    category: 'weight',
    unitName: 'Kilogram',
    symbol: 'kg',
    ratioToBase: 1,
    continuousUnit: true,
    packagingUnit: false,
  },
  {
    id: 3,
    category: 'quantity',
    unitName: 'Piece',
    symbol: 'pcs',
    ratioToBase: 1,
    continuousUnit: false,
    packagingUnit: true,
  },
];
