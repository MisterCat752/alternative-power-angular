import { Product } from '../models/products/product.model';

export const PRODUCTS_MOCK: Product[] = [
  // ---------- SOLAR PANEL LONGI ----------
  {
    id: 1,
    title: 'Solar Panel Longi 400W',
    description: 'High efficiency solar panel Longi',
    shortDescription: 'Longi 400W',
    image:
      'https://solartech.ro/wp-content/uploads/2025/05/Panou-fotovoltaic-450W-N-Type-CS6.2-48TD-450-Canadian-Solar.png',
    images: [
      'https://solartech.ro/wp-content/uploads/2025/05/Panou-fotovoltaic-450W-N-Type-CS6.2-48TD-450-Canadian-Solar.png',
    ],
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
    image: 'https://solartech.ro/wp-content/uploads/2023/08/1.png',
    images: [
      'https://solartech.ro/wp-content/uploads/2023/08/1.png',
      'https://solartech.ro/wp-content/uploads/2023/08/2.png',
    ],
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
    image: 'https://solartech.ro/wp-content/uploads/2022/03/cablu-solar-negru-2.jpg',
    images: [
      'https://solartech.ro/wp-content/uploads/2022/03/cablu-solar-negru-2.jpg',
      'https://solartech.ro/wp-content/uploads/2022/03/cablu-solar-rosu-1-1.jpg',
    ],
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

  // ---------- INVERTER DEYE 12K ----------
  {
    id: 8,
    title: 'Инвертор Deye Hybrid 12кВт SUN-12K-SG04LP3-EU',
    description: 'Three-phase Hybrid inverter 12kW',
    shortDescription: 'Hybrid inverter 12kW',
    image: null,
    sku: 'DEYE-12K-SG04',
    quantity: 4,
    price: 2800,
    category: 'deye-inverters',
    brand: 'Deye',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Brand', value: 'Deye' },
          { label: 'Model', value: 'SUN-12K-SG04LP3-EU' },
          { label: 'Inverter Type', value: 'Three-phase Inverter' },
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
    pricing: { currency: 'EUR', salePrice: 2800 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- INVERTER DEYE 15K ----------
  {
    id: 9,
    title: 'Инвертор Deye Hybrid 15кВт SUN-15K-SG05LP3-EU-SM2',
    description: 'Three-phase Hybrid inverter 15kW',
    shortDescription: 'Hybrid inverter 15kW',
    image: null,
    sku: 'DEYE-15K-SG05',
    quantity: 2,
    price: 3300,
    category: 'deye-inverters',
    brand: 'Deye',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Brand', value: 'Deye' },
          { label: 'Model', value: 'SUN-15K-SG05LP3-EU-SM2' },
          { label: 'Inverter Type', value: 'Three-phase Inverter' },
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
    pricing: { currency: 'EUR', salePrice: 3300 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- BATTERY DEYE 10.24kWh ----------
  {
    id: 10,
    title: 'Baterie 10.24kWh Deye LiFePO₄, low voltage',
    description: `Deye RW-F10.2 – 10.24kWh LiFePO₄, 48V, ideală pentru aplicații hibride`,
    shortDescription: 'Deye 10.24kWh battery',
    image: null,
    sku: 'DEYE-BAT-10.24',
    quantity: 6,
    price: 2400,
    category: 'deye-batteries',
    brand: 'Deye',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Brand', value: 'Deye' },
          { label: 'Model', value: 'Baterie 10.24kWh Deye LiFePO₄, low voltage' },
          { label: 'Battery Type', value: 'LiFePO4' },
          { label: 'Voltage', value: '48V' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 2400 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- BATTERY V-TAC 10.24kWh ----------
  {
    id: 11,
    title: 'Baterie 10.24kWh V-TAC LiFePO₄, low voltage',
    description: 'High performance LiFePO₄ battery V-TAC',
    shortDescription: 'V-TAC 10.24kWh',
    image: 'https://solartech.ro/wp-content/uploads/2025/07/12327-1.jpeg',
    images: [
      'https://solartech.ro/wp-content/uploads/2025/07/12327-1.jpeg',
      'https://solartech.ro/wp-content/uploads/2025/07/Design-fara-titlu.png',
      'https://solartech.ro/wp-content/uploads/2025/07/12323-1.png',
    ],
    sku: 'VTAC-10.24',
    quantity: 8,
    price: 2400,
    category: 'vtac-batteries',
    brand: 'V-TAC',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Brand', value: 'V-TAC' },
          { label: 'Model', value: 'Baterie 10.24kWh V-TAC LiFePO₄, low voltage' },
          { label: 'Battery Type', value: 'LiFePO4' },
          { label: 'Voltage', value: '51.2V' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 2400 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },
  {
    id: 12,
    title: 'Baterie 5.12kWh V-TAC  ',
    description: `V-TAC VT48100E-W este o baterie reîncărcabilă cu tehnologie LiFePO₄ (48V), ideală pentru sisteme rezidențiale și comerciale.`,
    shortDescription: 'V-TAC 5.12kWh battery',
    image: 'https://solartech.ro/wp-content/uploads/2024/02/pytes-v5.png',
    images: [
      'https://solartech.ro/wp-content/uploads/2024/02/pytes-v5.png',
      'https://solartech.ro/wp-content/uploads/2024/02/pytes-v5-3.png',
      'https://solartech.ro/wp-content/uploads/2024/02/pytes-v5-2.png',
    ],
    sku: 'VTAC-5.12',
    quantity: 10,
    price: 1200,
    category: 'vtac-batteries',
    brand: 'V-TAC',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Brand', value: 'V-TAC' },
          { label: 'Model', value: 'Baterie 5.12kWh V-TAC LiFePO₄, low voltage' },
          { label: 'Battery Type', value: 'LiFePO4' },
          { label: 'Voltage', value: '48V' },
          { label: 'Capacity', value: '5.12kWh' },
          { label: 'Warranty', value: '10 ani' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 1200 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- SOLAR CABLE RED 6mm² ----------
  {
    id: 13,
    title: 'Cablu solar fotovoltaic 6mm², Rola 500m, Roșu',
    description: 'High quality solar PV cable, red, 6mm², 500m roll',
    shortDescription: 'Solar cable red 6mm²',
    image: 'https://solartech.ro/wp-content/uploads/2022/03/cablu-solar-rosu-1-1.jpg',
    images: ['https://solartech.ro/wp-content/uploads/2022/03/cablu-solar-rosu-1-1.jpg'],
    sku: 'CABLE-RED-6MM',
    quantity: 20,
    price: 11999,
    category: 'accessories-cables',
    brand: 'Generic',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Type', value: 'PV Cable' },
          { label: 'Cross Section', value: '6mm²' },
          { label: 'Length', value: '500m' },
          { label: 'Color', value: 'Red' },
          { label: 'Warranty', value: '5 ani' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 11999 },
    stock: { baseUom: 'roll', purchaseUom: 'roll' },
    settings: { warranty: '5 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- SOLAR CABLE BLACK 6mm² ----------
  {
    id: 14,
    title: 'Cablu solar fotovoltaic 6mm², Rola 500m, Negru',
    description: 'High quality solar PV cable, black, 6mm², 500m roll',
    shortDescription: 'Solar cable black 6mm²',
    image: 'https://solartech.ro/wp-content/uploads/2022/03/cablu-solar-negru-2.jpg',
    images: ['https://solartech.ro/wp-content/uploads/2022/03/cablu-solar-negru-2.jpg'],
    sku: 'CABLE-BLK-6MM',
    quantity: 20,
    price: 11999,
    category: 'accessories-cables',
    brand: 'Generic',
    productType: 'single',
    specifications: [
      {
        group: 'Общие характеристики',
        items: [
          { label: 'Type', value: 'PV Cable' },
          { label: 'Cross Section', value: '6mm²' },
          { label: 'Length', value: '500m' },
          { label: 'Color', value: 'Black' },
          { label: 'Warranty', value: '5 ani' },
        ],
      },
    ],
    pricing: { currency: 'EUR', salePrice: 11999 },
    stock: { baseUom: 'roll', purchaseUom: 'roll' },
    settings: { warranty: '5 ani', published: true, internal: false, allowPreorder: true },
  },

  // ---------- INVERTER DEYE 10K Detailed ----------
  {
    id: 15,
    title: 'Invertor DEYE Hibrid 10kW Trifazat SUN-10K-SG05LP3-EU-SM2',
    description: `Injectie in reteaua nationala (EN50549-1)
Display color + Touchscreen
Port comunicatie CAN/RS485
Functie paralel
Conexiune generator sau directionare surplus din PV
6 perioade programabile pentru incarcare/descarcare acumulator
Functioneaza cu sau fara acumulatori Low Voltage
Intrare de 13000W de la panouri
Putere iesire 10kW Trifazat
Modul WiFi inclus, cu aplicatie gratuita
Garantie 10 ani`,
    shortDescription: 'Hybrid inverter 10kW trifazat',
    image: null,
    sku: 'DEYE-10K-TRI',
    quantity: 1,
    price: 8699,
    category: 'deye-inverters',
    brand: 'Deye',
    productType: 'single',
    specifications: [
      {
        group: 'General',
        items: [
          { label: 'Weight', value: '26 kg' },
          { label: 'Dimensions', value: '50 × 27 × 24 cm' },
        ],
      },
      {
        group: 'Battery Input',
        items: [{ label: 'Battery Voltage', value: '24V' }],
      },
      {
        group: 'PV Input',
        items: [
          { label: 'Max Power PV', value: '13000W' },
          { label: 'MPPT Voltage', value: '200-650VDC' },
        ],
      },
      {
        group: 'AC Output',
        items: [
          { label: 'Injection Network', value: 'Yes' },
          { label: 'Power', value: '10KW' },
        ],
      },
      {
        group: 'Connectivity',
        items: [
          { label: 'CAN/RS485', value: 'Supported' },
          { label: 'WiFi', value: 'Included' },
        ],
      },
    ],
    pricing: { currency: 'RON', salePrice: 8699 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },
  {
    id: 16,
    title: 'Acumulator Fotovoltaic LiFePo4 16.07kWh VT-16076B',
    description:
      'V-TAC VT-16076B – baterie LiFePO4, 16.07kWh, 51.2V, CAN, ideal pentru aplicații rezidențiale și comerciale.',
    shortDescription: 'V-TAC 16.07kWh',
    image: 'https://solartech.ro/wp-content/uploads/2025/10/RW-G10.6.png',
    images: [
      'https://solartech.ro/wp-content/uploads/2025/10/RW-G10.6.png',
      'https://solartech.ro/wp-content/uploads/2024/02/pytes-v5-3.png',
    ],
    sku: 'VT-16076B',
    quantity: 5,
    price: 10199,
    category: 'vtac-batteries',
    brand: 'V-TAC',
    productType: 'single',
    specifications: [
      {
        group: 'General',
        items: [
          { label: 'Brand', value: 'V-TAC' },
          { label: 'Model', value: 'VT-16076B' },
          { label: 'Capacity', value: '16.07kWh' },
          { label: 'Voltage', value: '51.2V' },
          { label: 'Battery Type', value: 'LiFePO4' },
        ],
      },
      {
        group: 'Electrical',
        items: [
          { label: 'Standard Charge Current', value: '140A' },
          { label: 'Max Charge Current', value: '150A' },
          { label: 'Standard Discharge Current', value: '140A' },
          { label: 'Max Discharge Current', value: '150A' },
        ],
      },
      {
        group: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '510 × 242 × 862 mm' },
          { label: 'Weight', value: '130 kg' },
          { label: 'Protection', value: 'IP20' },
        ],
      },
    ],
    pricing: { currency: 'LEI', salePrice: 10199 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },
  {
    id: 17,
    title: 'Acumulator Fotovoltaic ',
    description:
      'V-TAC VT-16076W – baterie LiFePO4, 16.07kWh, 51.2V, CAN, ideal pentru aplicații rezidențiale și comerciale.',
    shortDescription: 'V-TAC 16.07kWh',
    image: 'https://solartech.ro/wp-content/uploads/2024/02/pytes-v5-3.png',
    images: [
      'https://solartech.ro/wp-content/uploads/2025/10/RW-G10.6.png',
      'https://solartech.ro/wp-content/uploads/2024/02/pytes-v5-3.png',
    ],
    sku: 'VT-16076W',
    quantity: 5,
    price: 12199,
    category: 'vtac-batteries',
    brand: 'V-TAC',
    productType: 'single',
    specifications: [
      {
        group: 'General',
        items: [
          { label: 'Brand', value: 'V-TAC' },
          { label: 'Model', value: 'VT-16076W' },
          { label: 'Capacity', value: '16.07kWh' },
          { label: 'Voltage', value: '51.2V' },
          { label: 'Battery Type', value: 'LiFePO4' },
        ],
      },
      {
        group: 'Electrical',
        items: [
          { label: 'Standard Charge Current', value: '140A' },
          { label: 'Max Charge Current', value: '150A' },
          { label: 'Standard Discharge Current', value: '140A' },
          { label: 'Max Discharge Current', value: '150A' },
        ],
      },
      {
        group: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '510 × 242 × 862 mm' },
          { label: 'Weight', value: '130 kg' },
          { label: 'Protection', value: 'IP20' },
        ],
      },
    ],
    pricing: { currency: 'LEI', salePrice: 10199 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },
  {
    id: 18,
    title: 'Acumulator Fotovoltaic LiFePo4 High Voltage 20kWh',
    description:
      'V-TAC LiFePo4 20kWh modular, compatibil cu invertoare multiple, extensibil până la 40kWh.',
    shortDescription: 'V-TAC 20kWh',
    image: null,
    sku: 'OHS20K-100',
    quantity: 3,
    price: 25419.15,
    category: 'vtac-batteries',
    brand: 'V-TAC',
    productType: 'single',
    specifications: [
      {
        group: 'General',
        items: [
          { label: 'Brand', value: 'V-TAC' },
          { label: 'Capacity', value: '20kWh' },
          { label: 'Battery Type', value: 'LiFePO4 High Voltage' },
        ],
      },
      {
        group: 'Electrical',
        items: [
          { label: 'Nominal Charge/Discharge Current', value: '40A' },
          { label: 'Max Charge/Discharge Current', value: '50A' },
        ],
      },
      {
        group: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '590 × 420 × 194 mm' },
          { label: 'Weight', value: '207 kg' },
        ],
      },
    ],
    pricing: { currency: 'LEI', salePrice: 25419.15 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },
  {
    id: 19,
    title: 'Acumulator Fotovoltaic LiFePo4 High Voltage 25kWh',
    description:
      'V-TAC LiFePo4 25kWh modular, compatibil cu invertoare multiple, extensibil până la 40kWh.',
    shortDescription: 'V-TAC 25kWh',
    image: null,
    sku: 'OHS25K-100',
    quantity: 3,
    price: 30909.91,
    category: 'vtac-batteries',
    brand: 'V-TAC',
    productType: 'single',
    specifications: [
      {
        group: 'General',
        items: [
          { label: 'Brand', value: 'V-TAC' },
          { label: 'Capacity', value: '25kWh' },
          { label: 'Battery Type', value: 'LiFePO4 High Voltage' },
        ],
      },
      {
        group: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '59 × 42 × 100 cm' },
          { label: 'Weight', value: '252 kg' },
        ],
      },
    ],
    pricing: { currency: 'LEI', salePrice: 30909.91 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { warranty: '10 ani', published: true, internal: false, allowPreorder: true },
  },
  {
    id: 20,
    title: 'Фотоэлектрическая панель 455 Вт N-типа CS6.2-48TD-455',
    description:
      'Фотоэлектрическая панель Canadian Solar CS6.2-48TD-455 BLACK FRAME, 455Вт, КПД 22,8%, TOPCon N-Type, 144 клетки, IP68.',
    shortDescription: 'Canadian Solar 455W N-Type',
    image:
      'https://solartech.ro/wp-content/uploads/2025/05/Panou-fotovoltaic-450W-N-Type-CS6.2-48TD-450-Canadian-Solar.png',
    images: [
      'https://solartech.ro/wp-content/uploads/2025/05/Panou-fotovoltaic-450W-N-Type-CS6.2-48TD-450-Canadian-Solar.png',
    ],
    sku: 'CS6.2-48TD-455-BF',
    quantity: 10,
    price: 454,
    category: 'longi-panels',
    brand: 'Canadian Solar',
    productType: 'single',
    specifications: [
      {
        group: 'Electrical',
        items: [
          { label: 'Max Power (Pmax)', value: '455 W' },
          { label: 'Module Efficiency', value: '22.8%' },
          { label: 'Voltage at Max Power (Vmp)', value: '45.0 V' },
          { label: 'Current at Max Power (Imp)', value: '10.12 A' },
          { label: 'Open Circuit Voltage (Voc)', value: '53.1 V' },
          { label: 'Short Circuit Current (Isc)', value: '10.75 A' },
        ],
      },
      {
        group: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '1762 x 1134 x 30 mm' },
          { label: 'Weight', value: '24.6 kg' },
          { label: 'Cell Type', value: 'TOPCon N-Type, 144 cells (2x[12x6])' },
          { label: 'Connection', value: 'MC4-EVO2 / T6' },
          { label: 'Protection', value: 'IP68' },
        ],
      },
      {
        group: 'Warranty',
        items: [
          { label: 'Product Warranty', value: '15 years' },
          { label: 'Performance Warranty', value: '30 years' },
        ],
      },
    ],
    pricing: { currency: 'LEI', salePrice: 454 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { published: true, internal: false, allowPreorder: true },
  },
  {
    id: 21,
    title: 'Фотоэлектрическая панель Jinko Tiger Neo N-типа 490 Вт',
    description:
      'Монокристаллическая панель JinkoSolar 490 Вт N-типа, серия JKM490N-60HL4-V, КПД 22,67%, TOPCon, 120 ячеек, IP68.',
    shortDescription: 'Jinko 490W N-Type',
    image: 'https://solartech.ro/wp-content/uploads/2024/08/460-500-605-1.png',
    images: ['https://solartech.ro/wp-content/uploads/2024/08/460-500-605-1.png'],
    sku: 'JKM490N-60HL4-V',
    quantity: 5,
    price: 455.14,
    category: 'longi-panels',
    brand: 'Jinko',
    productType: 'single',
    specifications: [
      {
        group: 'Electrical',
        items: [
          { label: 'Max Power (Pmax)', value: '490 W' },
          { label: 'Voltage at Max Power (Vmp)', value: '36.43 V' },
          { label: 'Current at Max Power (Imp)', value: '13.45 A' },
          { label: 'Open Circuit Voltage (Voc)', value: '43.91 V' },
          { label: 'Short Circuit Current (Isc)', value: '14.01 A' },
          { label: 'Power Tolerance', value: '0 ~ +3%' },
          { label: 'Temperature Coefficient Pmax', value: '-0.29 %/°C' },
        ],
      },
      {
        group: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '1906 x 1134 x 30 mm' },
          { label: 'Weight', value: '22.5 kg' },
          { label: 'Cell Type', value: 'Monocrystalline N-Type, 120 cells (60x2)' },
          { label: 'Frame', value: 'Anodized aluminum' },
          { label: 'Protection', value: 'IP68' },
        ],
      },
      {
        group: 'Warranty',
        items: [
          { label: 'Product Warranty', value: '15 years' },
          { label: 'Performance Warranty', value: '30 years' },
        ],
      },
    ],
    pricing: { currency: 'LEI', salePrice: 455.14 },

    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { published: true, internal: false, allowPreorder: true },
  },
  {
    id: 22,
    title: 'Монокристаллическая гибкая фотоэлектрическая панель 100 Вт',
    description:
      'Монокристаллическая гибкая солнечная панель MONO FLEX 100 Вт, КПД 21,6%, IP65, для мобильных и автономных систем.',
    shortDescription: 'Volt Polska 100W MONO FLEX',
    image: 'https://solartech.ro/wp-content/uploads/2025/09/04280295.webp',
    images: ['https://solartech.ro/wp-content/uploads/2025/09/04280295.webp'],
    sku: '04280297',
    quantity: 15,
    price: 483,
    category: 'longi-panels',
    brand: 'Volt Polska',
    productType: 'single',
    specifications: [
      {
        group: 'Electrical',
        items: [
          { label: 'Max Power (Pmax)', value: '100 W' },
          { label: 'Voltage at Max Power (Vmp)', value: '18.72 V' },
          { label: 'Current at Max Power (Imp)', value: '5.34 A' },
          { label: 'Open Circuit Voltage (Voc)', value: '22.46 V' },
          { label: 'Short Circuit Current (Isc)', value: '5.77 A' },
          { label: 'Module Efficiency', value: '18.2%' },
          { label: 'Solar Cell Efficiency', value: '21.6%' },
        ],
      },
      {
        group: 'Physical Specifications',
        items: [
          { label: 'Dimensions', value: '1080 x 540 x 4 mm' },
          { label: 'Weight', value: '2.13 kg' },
          { label: 'Protection Class', value: 'IP65' },
        ],
      },
    ],
    pricing: { currency: 'LEI', salePrice: 483 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { published: true, internal: false, allowPreorder: true },
  },
  {
    id: 23,
    title: 'Складная портативная фотоэлектрическая панель 120 Вт',
    description:
      'Складная солнечная панель V-TAC VT-10120, 120 Вт, портативная, с USB и Type-C выходами, IP65, для кемпинга и автономных систем.',
    shortDescription: 'V-TAC VT-10120 120W Foldable',
    image: 'https://solartech.ro/wp-content/uploads/2024/03/11564-P1-Custom.jpg',
    images: [
      'https://solartech.ro/wp-content/uploads/2024/03/11564-P1-Custom.jpg',
      'https://solartech.ro/wp-content/uploads/2024/03/11564-P3-Custom.jpg',
    ],
    sku: '11446',
    quantity: 20,
    price: 420.72,
    category: 'longi-panels',
    brand: 'V-TAC',
    productType: 'single',
    specifications: [
      {
        group: 'Electrical',
        items: [
          { label: 'Max Power (Pmax)', value: '120 W' },
          { label: 'Voltage at Max Power (Vmp)', value: '17.6 V' },
          { label: 'Current at Max Power (Imp)', value: '6.36 A' },
          { label: 'Open Circuit Voltage (Voc)', value: '21.2 V' },
          { label: 'Short Circuit Current (Isc)', value: '6.83 A' },
        ],
      },
      {
        group: 'Physical Specifications',
        items: [
          { label: 'Folded Dimensions', value: '430 x 540 x 54 mm' },
          { label: 'Extended Dimensions', value: '1930 x 430 x 25 mm' },
          { label: 'Weight', value: '6.3 kg' },
        ],
      },
      {
        group: 'Ports',
        items: [
          { label: 'DC Output', value: '5521, 19.3 V' },
          { label: 'USB Type-C', value: 'до 45W' },
          { label: 'USB-A', value: 'Quick Charge 3.0' },
        ],
      },
    ],
    pricing: { currency: 'LEI', salePrice: 420.72 },
    stock: { baseUom: 'pcs', purchaseUom: 'pcs' },
    settings: { published: true, internal: false, allowPreorder: true },
  },
];
