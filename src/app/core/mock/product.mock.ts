import { Product } from '../models/products/product.model';

export const PRODUCTS_MOCK: Product[] = [
  // ---------- SOLAR PANEL LONGI ----------
  {
    id: 1,
    title: 'Solar Panel Longi 400W',
    description: 'High efficiency solar panel Longi',
    shortDescription: 'Longi 400W',
    image: null,
    sku: 'LONGI-400',
    quantity: 15,
    price: 320,
    category: 'solar-panels',
    brand: 'Longi',
    productType: 'single',
    specifications: [
      {
        group: 'General',
        items: [
          { label: 'Power', value: '400W' },
          { label: 'Type', value: 'Monocrystalline' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 320 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- INVERTER DEYE 10K ----------
  {
    id: 2,
    title: 'Инвертор Deye Hybrid 10кВт SUN-10K-SG05LP3-EU-SM2',
    description: `100% несбалансированный выход
Возможность подключения по переменному току
Максимум 10 параллельных модулей
Поддержка нескольких аккумуляторов
Максимальный ток зарядки/разрядки 240A
Поддержка генератора
48V батарея с трансформаторной изоляцией
6 временных интервалов зарядки/разрядки`,
    shortDescription: 'Hybrid inverter 10kW',
    image: null,
    sku: 'DEYE-10K-SG05',
    quantity: 3,
    price: 2700,
    category: 'inverters',
    brand: 'Deye',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Brand', value: 'Deye' },
          { label: 'Model', value: 'SUN-10K-SG05LP3-EU-SM2' },
          { label: 'Inverter Type', value: 'Three-phase' },
          { label: 'Battery Voltage', value: '48V Low Voltage' },
          { label: 'Output Voltage', value: '230V' },
        ],
      },
      {
        group: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '-' },
          { label: 'Weight', value: 'None kg' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 2700 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- BATTERY DYNESS ----------
  {
    id: 3,
    title: 'Baterie 10.24kWh DYNESS LiFePO₄, low voltage',
    description: `DYNESS Powerbox G2 – 10.24kWh LiFePO4, 48V
Stocare avansată pentru sisteme hibride.`,
    shortDescription: 'Dyness 10.24kWh battery',
    image: null,
    sku: 'DYNESS-G2',
    quantity: 6,
    price: 2400,
    category: 'dyness-batteries',
    brand: 'Dyness',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Brand', value: 'Dyness' },
          { label: 'Model', value: 'Powerbox G2 10.24kWh' },
          { label: 'Battery Type', value: 'LiFePO4' },
          { label: 'Voltage', value: '48V' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 2400 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '5 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- BATTERY V-TAC ----------
  {
    id: 4,
    title: 'Acumulator LiFePo4 5.12kWh V-TAC',
    description: 'High performance 5.12kWh battery',
    shortDescription: 'V-TAC 5.12kWh',
    image: null,
    sku: 'VTAC-5.12',
    quantity: 12,
    price: 4829.83,
    category: 'vtac-batteries',
    brand: 'V-TAC',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Brand', value: 'V-TAC' },
          { label: 'Capacity', value: '5.12kWh' },
          { label: 'Voltage', value: '48V' },
          { label: 'Chemistry', value: 'LiFePO4' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 4829.83 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '5 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- SOLAR KIT ----------
  {
    id: 5,
    title: 'Kit solar hibrid 5kW',
    description: 'Complete hybrid solar kit',
    shortDescription: '5kW kit',
    image: null,
    sku: 'KIT-5KW',
    quantity: 8,
    price: 5200,
    category: 'solar-kit',
    brand: 'Generic',
    productType: 'bundle',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Included', value: 'Panels, Inverter, Battery, Cables' },
          { label: 'Power', value: '5kW' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 5200 },
    stock: { baseUom: 'set', purchaseUom: 'set' },
    settings: { warranty: '5 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- ACCESSORY CABLING ----------
  {
    id: 6,
    title: 'Cables for solar kit',
    description: 'High quality PV cables',
    shortDescription: 'Cables',
    image: null,
    sku: 'CABLE-01',
    quantity: 50,
    price: 25,
    category: 'accessories-cables',
    brand: 'Generic',
    productType: 'single',
    specifications: [
      {
        group: 'General',
        items: [
          { label: 'Type', value: 'PV cable' },
          { label: 'Length', value: '10m' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 25 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '2 ani', published: true, internal: false, allowPreorder: false },
  },

  // ---------- ACCESSORY CONNECTORS ----------
  {
    id: 7,
    title: 'Connectors for solar kit',
    description: 'MC4 connectors',
    shortDescription: 'Connectors',
    image: null,
    sku: 'CONN-01',
    quantity: 40,
    price: 15,
    category: 'accessories-connectors',
    brand: 'Generic',
    productType: 'single',
    specifications: [
      {
        group: 'General',
        items: [
          { label: 'Type', value: 'MC4 connector' },
          { label: 'Compatibility', value: 'Solar Panels' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 15 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '2 ani', published: true, internal: false, allowPreorder: false },
  },
];
