// core/mock/warranties.mock.ts
import { Warranty } from '../models/warranty.model';

export const WARRANTIES_MOCK: Warranty[] = [
  {
    id: 1,
    name: 'Standard Warranty',
    provider: 'seller',
    durationYears: 1,
    serviceType: 'carry_in',
  },
  {
    id: 2,
    name: 'Extended Warranty',
    provider: 'manufacturer',
    durationYears: 3,
    serviceType: 'on_site',
  },
];
