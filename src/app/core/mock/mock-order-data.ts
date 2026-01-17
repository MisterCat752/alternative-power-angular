import { OrderDetails } from '../models/orders/orders.model';

export const MOCK_ORDER: OrderDetails = {
  id: 2,
  code: 'SO-202601-0002',
  status: 'processing',
  date: '2026-01-07',
  currency: 'MDL',
  subtotal: 28320.64,
  total: 28320.64,
  items: [
    {
      id: 1,
      sku: '921474',
      unit_price: 26.25459,
      quantity: 1000,
      total: 26254.59,
    },
    {
      id: 2,
      sku: '942275',
      unit_price: 2066.05,
      quantity: 1,
      total: 2066.05,
    },
  ],
  customer: {
    name: 'Alexandru Gherasimov',
    email: 'gherasimovalexandru@hotmail.com',
    phone: '+37360096895',
  },
  shipping: {
    email: 'gherasimovalexandru@hotmail.com',
    phone: '+37360096895',
    address: 'No shipping address',
  },
};
