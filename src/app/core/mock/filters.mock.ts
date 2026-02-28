import { FilterGroup } from '../../shared/filters-panel/filters-panel';

export const CATEGORY_FILTERS_MOCK: Record<string, FilterGroup[]> = {
  'longi-panels': [
    {
      key: 'brand',
      title: 'Brand',
      type: 'checkbox',
      opened: true,
      options: [
        { label: 'Canadian Solar', value: 'canadian solar' },
        { label: 'Jinko', value: 'jinko' },
        { label: 'Volt Polska', value: 'volt polska' },
        { label: 'V-TAC', value: 'v-tac' },
      ],
    },
    {
      key: 'cell type',
      title: 'Cell Type',
      type: 'checkbox',
      opened: true,
      options: [
        { label: 'TOPCon', value: 'topcon' },
        { label: 'Monocrystalline', value: 'monocrystalline' },
      ],
    },
    {
      key: 'max power (pmax)',
      title: 'Power',
      type: 'checkbox',
      opened: true,
      options: [
        { label: '100W', value: '100 w' },
        { label: '120W', value: '120 w' },
        { label: '455W', value: '455 w' },
        { label: '490W', value: '490 w' },
      ],
    },
  ],

  'vtac-batteries': [
    {
      key: 'capacity',
      title: 'Capacity',
      type: 'checkbox',
      opened: true,
      options: [
        { label: '5.12kWh', value: '5.12kwh' },
        { label: '10.24kWh', value: '10.24kwh' },
        { label: '16.07kWh', value: '16.07kwh' },
        { label: '20kWh', value: '20kwh' },
        { label: '25kWh', value: '25kwh' },
      ],
    },
    {
      key: 'battery type',
      title: 'Battery Type',
      type: 'checkbox',
      opened: true,
      options: [
        { label: 'LiFePO4', value: 'lifepo4' },
        { label: 'High Voltage', value: 'high voltage' },
      ],
    },
  ],

  'deye-inverters': [
    {
      key: 'power',
      title: 'Power',
      type: 'checkbox',
      opened: true,
      options: [
        { label: '10kW', value: '10kw' },
        { label: '12kW', value: '12kw' },
        { label: '15kW', value: '15kw' },
      ],
    },
  ],
};
// core/mock/category-filters-crud.mock.ts

import { CategoryFilter } from '../models/filter.model';

export const CATEGORY_FILTERS_CRUD_MOCK: CategoryFilter[] = [
  // =========================
  // longi-panels
  // =========================

  {
    id: 2,
    category: 'longi-panels',
    key: 'cell type',
    title: 'Cell Type',
    type: 'checkbox',
    isActive: true,
    options: [
      { label: 'TOPCon N-Type', value: 'topcon n-type' },
      { label: 'Monocrystalline N-Type', value: 'monocrystalline n-type' },
      { label: 'Monocrystalline', value: 'monocrystalline' },
    ],
  },
  {
    id: 3,
    category: 'longi-panels',
    key: 'max power (pmax)',
    title: 'Power',
    type: 'checkbox',
    isActive: true,
    options: [
      { label: '100W', value: '100 w' },
      { label: '120W', value: '120 w' },
      { label: '455W', value: '455 w' },
      { label: '490W', value: '490 w' },
    ],
  },

  // =========================
  // vtac-batteries
  // =========================
  {
    id: 4,
    category: 'vtac-batteries',
    key: 'capacity',
    title: 'Capacity',
    type: 'checkbox',
    isActive: true,
    options: [
      { label: '5.12kWh', value: '5.12kwh' },
      { label: '10.24kWh', value: '10.24kwh' },
      { label: '16.07kWh', value: '16.07kwh' },
      { label: '20kWh', value: '20kwh' },
      { label: '25kWh', value: '25kwh' },
    ],
  },
  {
    id: 5,
    category: 'vtac-batteries',
    key: 'battery type',
    title: 'Battery Type',
    type: 'checkbox',
    isActive: true,
    options: [
      { label: 'LiFePO4', value: 'lifepo4' },
      { label: 'High Voltage', value: 'high voltage' },
    ],
  },

  // =========================
  // deye-batteries
  // =========================
  {
    id: 6,
    category: 'deye-batteries',
    key: 'capacity',
    title: 'Capacity',
    type: 'checkbox',
    isActive: true,
    options: [
      { label: '6.14kWh', value: '6.14kwh' },
      { label: '10.24kWh', value: '10.24kwh' },
      { label: '10.64kWh', value: '10.64kwh' },
      { label: '16.07kWh', value: '16.07kwh' },
      { label: '161.28kWh', value: '161.28kwh' },
    ],
  },
  {
    id: 7,
    category: 'deye-batteries',
    key: 'cell type',
    title: 'Cell Type',
    type: 'checkbox',
    isActive: true,
    options: [{ label: 'LiFePO4 (LFP)', value: 'lifepo4 (lfp)' }],
  },

  // =========================
  // deye-inverters
  // =========================
  {
    id: 8,
    category: 'deye-inverters',
    key: 'power',
    title: 'Power',
    type: 'checkbox',
    isActive: true,
    options: [
      { label: '10kW', value: '10kw' },
      { label: '12kW', value: '12kw' },
      { label: '15kW', value: '15kw' },
    ],
  },
  {
    id: 9,
    category: 'deye-inverters',
    key: 'type',
    title: 'Inverter Type',
    type: 'checkbox',
    isActive: true,
    options: [
      { label: 'Hybrid', value: 'hybrid' },
      { label: 'Ongrid', value: 'ongrid' },
      { label: 'Three-phase', value: 'three-phase' },
    ],
  },

  // =========================
  // accessories-cables
  // =========================
  {
    id: 10,
    category: 'accessories-cables',
    key: 'color',
    title: 'Color',
    type: 'checkbox',
    isActive: true,
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Black', value: 'black' },
    ],
  },
  {
    id: 11,
    category: 'accessories-cables',
    key: 'cross section',
    title: 'Cross Section',
    type: 'checkbox',
    isActive: true,
    options: [{ label: '6mm²', value: '6mm²' }],
  },
];
