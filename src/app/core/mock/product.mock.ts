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
    specifications: [
      {
        group: 'Processor1 / Chipset',
        items: [
          { label: 'Chip name', value: 'Apple M1 chip' },
          { label: 'CPU core', value: '8 (4 performance and 4 efficiency)' },
          { label: 'GPU core', value: '7' },
          { label: 'Neural engine', value: '16 cores' },
        ],
      },
      {
        group: 'Storage1',
        items: [
          { label: 'Memory', value: '8 GB unified' },
          { label: 'SSD', value: '256 GB' },
        ],
      },
      {
        group: 'Display',
        items: [
          { label: 'Display type', value: 'Retina' },
          { label: 'Size', value: '24” (23.5 actual)' },
          { label: 'Resolution', value: '4480 x 2520' },
          { label: 'Brightness', value: '500 nits' },
        ],
      },
      {
        group: 'Audio',
        items: [
          { label: 'Speakers', value: 'Six-speaker system with woofers' },
          { label: 'Spatial audio', value: 'Dolby Atmos' },
          { label: 'Microphones', value: 'Studio-quality three-mic array' },
        ],
      },
    ],
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

  // 🔥 Товар для Product Page
  {
    id: 2,
    title: 'Инвертор Deye Hybrid 20кВт SUN-20K-SG05LP3-EU-SM2',
    description:
      'Гибридный трёхфазный инвертор высокой мощности для коммерческих и бытовых солнечных систем с возможностью параллельной работы и подключения нескольких аккумуляторов.',
    shortDescription: 'Hybrid inverter 20kW 3-phase',
    image: null,
    sku: 'DEYE-20K-SG05',
    quantity: 5,
    price: 3500,
    category: 'inverters',
    brand: 'Deye',
    productType: 'single',
    specifications: [
      {
        group: 'Processor2 / Chipset',
        items: [
          { label: 'Chip name', value: 'Apple M1 chip' },
          { label: 'CPU core', value: '8 (4 performance and 4 efficiency)' },
          { label: 'GPU core', value: '7' },
          { label: 'Neural engine', value: '16 cores' },
        ],
      },
      {
        group: 'Storage',
        items: [
          { label: 'Memory', value: '8 GB unified' },
          { label: 'SSD', value: '256 GB' },
        ],
      },
      {
        group: 'Display',
        items: [
          { label: 'Display type', value: 'Retina' },
          { label: 'Size', value: '24” (23.5 actual)' },
          { label: 'Resolution', value: '4480 x 2520' },
          { label: 'Brightness', value: '500 nits' },
        ],
      },
      {
        group: 'Audio',
        items: [
          { label: 'Speakers', value: 'Six-speaker system with woofers' },
          { label: 'Spatial audio', value: 'Dolby Atmos' },
          { label: 'Microphones', value: 'Studio-quality three-mic array' },
        ],
      },
    ],
    pricing: {
      currency: 'EUR',
      listPrice: 3700,
      installerPrice: 3400,
      salePrice: 3500,
      saleEndsAt: null,
      manualWebsitePrice: 3500,
      websiteDiscount: 0,
      defaultMargin: 25,
      pricingProfile: null,
      tva: null,
      customs: null,
      logistics: null,
    },
    stock: {
      baseUom: 'pcs',
      purchaseUom: 'pcs',
    },
    settings: {
      warranty: '10 ani',
      invoice: '',
      slug: 'deye-hybrid-20kw',
      modelName: 'SUN-20K-SG05LP3-EU-SM2',
      published: true,
      internal: false,
      allowPreorder: true,
    },
  },
];
