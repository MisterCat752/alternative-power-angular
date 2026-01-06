import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'product/:slug',
    loadComponent: () => import('./pages/product/product').then((m) => m.ProductPage),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/auth/login/login').then((m) => m.LoginPage),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./pages/auth/register/register').then((m) => m.RegisterPage),
  },
  {
    path: 'catalog/:categorySlug',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/layout/dashboard-layout/dashboard-layout').then(
        (m) => m.DashboardLayout
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'catalog/products' },

      {
        path: 'catalog/products',
        loadComponent: () =>
          import('./pages/dashboard/catalog/product-page/product-page').then((m) => m.ProductsPage),
      },
      {
        path: 'catalog/uom-categories',
        loadComponent: () =>
          import('./pages/dashboard/catalog/uom-categories-page/uom-categories-page').then(
            (m) => m.UomCategoriesPage
          ),
      },
      {
        path: 'catalog/units-of-measure',
        loadComponent: () =>
          import('./pages/dashboard/catalog/units-of-measure-page/units-of-measure-page').then(
            (m) => m.UnitsOfMeasurePage
          ),
      },
      {
        path: 'catalog/warranties',
        loadComponent: () =>
          import('./pages/dashboard/catalog/warranties-page/warranties-page').then(
            (m) => m.WarrantiesPage
          ),
      },
      {
        path: 'catalog/brands',
        loadComponent: () =>
          import('./pages/dashboard/catalog/brands-page/brands-page').then((m) => m.BrandsPage),
      },
      {
        path: 'catalog/categories',
        loadComponent: () =>
          import('./pages/dashboard/catalog/categories-page/categories-page').then(
            (m) => m.CategoriesPage
          ),
      },
      {
        path: 'inventory/product-stock',
        loadComponent: () =>
          import('./pages/dashboard/inventory/product-stock-page/product-stock-page').then(
            (m) => m.ProductStockPage
          ),
      },
      {
        path: 'inventory/stock-moves',
        loadComponent: () =>
          import('./pages/dashboard/inventory/stock-moves-page/stock-moves-page').then(
            (m) => m.StockMovesPage
          ),
      },
      {
        path: 'inventory/fifo-lots',
        loadComponent: () =>
          import('./pages/dashboard/inventory/fifo-lots-page/fifo-lots-page').then(
            (m) => m.FifoLotsPage
          ),
      },
      {
        path: 'inventory/invoices',
        loadComponent: () =>
          import('./pages/dashboard/inventory/invoices-page/invoices-page').then(
            (m) => m.InvoicesPage
          ),
      },
      {
        path: 'inventory/vendors',
        loadComponent: () =>
          import('./pages/dashboard/inventory/vendors-page/vendors-page').then(
            (m) => m.VendorsPage
          ),
      },
      {
        path: 'inventory/purchase-lines',
        loadComponent: () =>
          import('./pages/dashboard/inventory/purchase-lines-page/purchase-lines-page').then(
            (m) => m.PurchaseLinesPage
          ),
      },
      {
        path: 'inventory/locations',
        loadComponent: () =>
          import('./pages/dashboard/inventory/locations-page/locations-page').then(
            (m) => m.LocationsPage
          ),
      },
    ],
  },
];
