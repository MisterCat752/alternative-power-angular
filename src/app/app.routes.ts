import { Routes } from '@angular/router';
import { OrdersListPage } from './pages/dashboard/sales/orders-list-page/orders-list-page/orders-list-page';
import { VerifyEmailPage } from './pages/verify-email/verify-email';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role.guard';

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
  { path: 'verify-email', component: VerifyEmailPage },
  {
    path: 'catalog/:categorySlug',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogPage),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
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
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
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

      {
        path: 'accounts/users',
        loadComponent: () =>
          import('./pages/dashboard/accounts/users-page/users-page').then((m) => m.UsersPage),
      },
      {
        path: 'accounts/group-and-roles',
        loadComponent: () =>
          import('./pages/dashboard/accounts/groups-and-roles-page/groups-and-roles-page').then(
            (m) => m.GroupsAndRolesPage
          ),
      },

      {
        path: 'translations',
        loadComponent: () =>
          import('./pages/dashboard/translations/translations-page/translations-page').then(
            (m) => m.TranslationsPage
          ),
      },

      {
        path: 'sync-logs',
        loadComponent: () =>
          import('./pages/dashboard/core/sync-logs-page/sync-logs-page').then(
            (m) => m.SyncLogsPage
          ),
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./pages/dashboard/offers/offers-page/offers-page').then((m) => m.OffersPage),
      },

      {
        path: 'sales/orders-list',
        loadComponent: () =>
          import('./pages/dashboard/sales/orders-list-page/orders-list-page/orders-list-page').then(
            (m) => m.OrdersListPage
          ),
      },
      {
        path: 'sales/sold-products',
        loadComponent: () =>
          import(
            './pages/dashboard/sales/sold-products-page/sold-products-page/sold-products-page'
          ).then((m) => m.SoldProductsPage),
      },

      {
        path: 'sales/warehouse-fulfillment',
        loadComponent: () =>
          import(
            './pages/dashboard/sales/warehouse-fulfillment-page/warehouse-fulfillment-page'
          ).then((m) => m.WarehouseFulfillmentPage),
      },
      {
        path: 'sales/my-orders-list',
        loadComponent: () =>
          import('./pages/dashboard/sales/my-orders-list-page/my-orders-list-page').then(
            (m) => m.MyOrdersListPage
          ),
      },

      // cart
      {
        path: 'cart/cart-list',
        loadComponent: () =>
          import('./pages/dashboard/cart/carts-list-page/carts-list-page').then(
            (m) => m.CartsListPage
          ),
      },

      // project
      {
        path: 'projects/projects-list',
        loadComponent: () =>
          import('./pages/dashboard/projects/projects-list-page/projects-list-page').then(
            (m) => m.ProjectsListPage
          ),
      },
      {
        path: 'projects/my-projects-list',
        loadComponent: () =>
          import('./pages/dashboard/projects/my-projects-list-page/my-projects-list-page').then(
            (m) => m.MyProjectsListPage
          ),
      },
    ],
  },
];
