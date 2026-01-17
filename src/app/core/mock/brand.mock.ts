// core/mock/brand.mock.ts
import { Brand } from '../models/brand.model';

export const BRANDS_MOCK: Brand[] = [
  {
    id: 1,
    name: 'Bosch',
    slug: 'bosch',
    country: 'Germany',
    website: 'https://bosch.com',
    logo: null,
  },
  {
    id: 2,
    name: 'Makita',
    slug: 'makita',
    country: 'Japan',
    website: 'https://makita.com',
    logo: null,
  },
];
