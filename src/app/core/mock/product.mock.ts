// core/mock/products.mock.ts

import { Product } from '../models/products/product.model';

export const PRODUCTS_MOCK: Product[] = [
  {
    id: 1,
    title: 'Solar Panel X100',
    description: 'High efficiency solar panel',
    shortDescription: 'X100 panel',
    image: null,
    sku: 'SPX100',
    quantity: 10,
    price: 10000,
    category: 'solar',
    brand: 'Huawei',
    productType: 'single',
    pricing: {
      currency: 'MDL',
      listPrice: 12000,
      installerPrice: 11000,
      salePrice: 12,
      saleEndsAt: null,
      manualWebsitePrice: 13,
      websiteDiscount: 0,
      defaultMargin: 30,
      pricingProfile: null,
      tva: null,
      customs: null,
      logistics: null,
    },
    stock: {
      baseUom: 'meter',
      purchaseUom: 'same',
    },
    settings: {
      warranty: null,
      invoice: '',
      slug: '',
      modelName: '',
      published: false,
      internal: false,
      allowPreorder: false,
    },
  },
];
