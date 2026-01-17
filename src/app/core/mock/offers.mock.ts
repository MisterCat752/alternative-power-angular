// core/mocks/offers.mock.ts
import { OfferDetails } from '../models/offers/offer.model';

export const OFFERS_MOCK: OfferDetails[] = [
  {
    id: 1,
    code: 'OF-20251211-0318A',
    version: 'v1',
    created_at: '2025-12-11T02:33:00Z',
    valid_until: '2026-01-10T00:00:00Z',
    status: 'Expired',
    project_name: 'PROJECT NAME',
    project_owner: 'gherasimovalexandru@hotmail.com',
    created_by: 'gherasimovalexandru@hotmail.com',
    total: 87489.44,
    items: [
      {
        sku: '777134',
        name: 'INVERTOR HYBRID DEYE SUN-10K-SG05LP3-EU-SM2',
        qty: 1,
        unit_price: 44153.38,
        total: 44153.38,
        group: 'Main Equipment',
      },
      {
        sku: '248127',
        name: 'BATERIE LITHIUM 10.24 kWh VT-10240B',
        qty: 1,
        unit_price: 43336.06,
        total: 43336.06,
        group: 'Main Equipment',
      },
      {
        sku: '370096',
        name: 'BATERIE LITHIUM 10.24 kWh VT-10240W',
        qty: 1,
        unit_price: 41731.02,
        total: 41731.02,
        group: 'Mounting / Structure',
      },
      {
        sku: '218729',
        name: 'Cablu AVVGTr 4*16/ 23',
        qty: 10,
        unit_price: 43.51,
        total: 435.1,
        group: 'Cables & Protection',
      },
      {
        sku: '890261',
        name: 'Descarcator SPD 2P 40KA 1000V DC NOMINAL',
        qty: 1,
        unit_price: 461.92,
        total: 461.92,
        group: 'Small Hardware & Extras',
      },
    ],
  },
];
