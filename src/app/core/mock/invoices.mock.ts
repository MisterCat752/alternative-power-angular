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
];
