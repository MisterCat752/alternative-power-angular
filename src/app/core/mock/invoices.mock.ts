import { PurchaseInvoiceDetailsDto } from '../models/invoice';

export const INVOICES_MOCK: PurchaseInvoiceDetailsDto[] = [
  {
    id: 1,
    doc_number: 'INV-2025-001',
    doc_date: '2025-02-10',
    currency: 'EUR',
    channel: 'IMPORT',
    doc_sum: 3340,
    status: 'RECEIVED',

    source: 'Supplier delivery',

    vendor: {
      id: 1,
      name: 'SolarTech SRL',
      email: 'sales@solartech.ro',
      phone: '+40 712 555 111',
      vat_id: 'RO123456',
    },

    lines: [
      {
        id: 1,
        line_no: 1,
        qty: 5,
        unit_cost: 320,
        line_sum: 1600,
        product: {
          id: 1,
          code: 'LONGI-400',
          product_name: 'Solar Panel Longi 400W',
          uom: 'pcs',
        },
      },
      {
        id: 2,
        line_no: 2,
        qty: 1,
        unit_cost: 2700,
        line_sum: 2700,
        product: {
          id: 2,
          code: 'DEYE-10K-SG05',
          product_name: 'Deye Hybrid 10kW',
          uom: 'pcs',
        },
      },
    ],
  },

  {
    id: 2,
    doc_number: 'INV-2025-002',
    doc_date: '2025-02-14',
    currency: 'EUR',
    channel: 'WAREHOUSE',
    doc_sum: 4829.83,
    status: 'DRAFT',

    source: 'Local supplier',

    vendor: {
      id: 2,
      name: 'Energy Storage SRL',
      email: 'office@energy.md',
      phone: '+373 69000000',
      vat_id: 'MD998877',
    },

    lines: [
      {
        id: 3,
        line_no: 1,
        qty: 1,
        unit_cost: 4829.83,
        line_sum: 4829.83,
        product: {
          id: 4,
          code: 'VTAC-5.12',
          product_name: 'V-TAC 5.12kWh Battery',
          uom: 'pcs',
        },
      },
    ],
  },

  // ---------- новые доп. инвойсы ----------
  {
    id: 3,
    doc_number: 'INV-2025-003',
    doc_date: '2025-03-01',
    currency: 'EUR',
    channel: 'IMPORT',
    doc_sum: 5200,
    status: 'RECEIVED',

    source: 'Supplier delivery',

    vendor: {
      id: 1,
      name: 'SolarTech SRL',
      email: 'sales@solartech.ro',
      phone: '+40 712 555 111',
      vat_id: 'RO123456',
    },

    lines: [
      {
        id: 4,
        line_no: 1,
        qty: 2,
        unit_cost: 5200,
        line_sum: 10400,
        product: {
          id: 5,
          code: 'KIT-5KW',
          product_name: 'Hybrid Solar Kit 5kW',
          uom: 'set',
        },
      },
    ],
  },

  {
    id: 4,
    doc_number: 'INV-2025-004',
    doc_date: '2025-03-05',
    currency: 'EUR',
    channel: 'IMPORT',
    doc_sum: 50,
    status: 'RECEIVED',

    source: 'Accessory Supplier',

    vendor: {
      id: 3,
      name: 'PV Accessories SRL',
      email: 'contact@pvaccessories.ro',
      phone: '+40 712 222 333',
      vat_id: 'RO654321',
    },

    lines: [
      {
        id: 5,
        line_no: 1,
        qty: 50,
        unit_cost: 25,
        line_sum: 1250,
        product: {
          id: 6,
          code: 'CABLE-01',
          product_name: 'Cables for solar kit',
          uom: 'pcs',
        },
      },
      {
        id: 6,
        line_no: 2,
        qty: 20,
        unit_cost: 11999,
        line_sum: 239980,
        product: {
          id: 13,
          code: 'CABLE-RED-6MM',
          product_name: 'Cablu solar fotovoltaic 6mm², Rola 500m, Roșu',
          uom: 'roll',
        },
      },
    ],
  },
];
