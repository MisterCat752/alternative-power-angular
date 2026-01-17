import { Routes } from '@angular/router';
import { OrdersListPage } from './pages/dashboard/sales/orders-list-page/orders-list-page/orders-list-page';
import { VerifyEmailPage } from './pages/verify-email/verify-email';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role.guard';
import { MainLayout } from './shared/layout/main-layout/main-layout';

export const routes: Routes = [
  // Публичные страницы (MainLayout)
  // -------------------------------
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'product/:slug',
        loadComponent: () => import('./pages/product/product').then((m) => m.ProductPage),
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then((m) => m.RegisterPage),
      },
      {
        path: 'verify-email',
        component: VerifyEmailPage,
      },
      {
        path: 'catalog/:categorySlug',
        loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogPage),
      },
    ],
  },

  // дашборд
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/layout/dashboard-layout/dashboard-layout').then(
        (m) => m.DashboardLayout
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: '' },
      {
        path: 'profile',
        loadComponent: () => import('./pages/dashboard/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'profile-settings',
        loadComponent: () =>
          import('./pages/dashboard/profile/profile-settings/profile-settings').then(
            (m) => m.ProfileSettings
          ),
      },
      {
        path: 'catalog/products',
        loadComponent: () =>
          import('./pages/dashboard/catalog/product-page/product-page').then((m) => m.ProductsPage),
      },
      {
        path: 'catalog/products/create-product',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/product-page/product-create-page/product-create-page'
          ).then((m) => m.ProductForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/products/edit/:id',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/product-page/product-create-page/product-create-page'
          ).then((m) => m.ProductForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
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
        path: 'catalog/uom-categories/create-uom-categories',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/uom-categories-page/uom-category-create-page/uom-category-create-page'
          ).then((m) => m.UomCategoryForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/uom-categories/edit/:id',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/uom-categories-page/uom-category-create-page/uom-category-create-page'
          ).then((m) => m.UomCategoryForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/units-of-measure',
        loadComponent: () =>
          import('./pages/dashboard/catalog/units-of-measure-page/units-of-measure-page').then(
            (m) => m.UnitsOfMeasurePage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/units-of-measure/create-units-of-measure',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/units-of-measure-page/unit-of-measure-create-page/unit-of-measure-create-page'
          ).then((m) => m.UnitOfMeasureForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/units-of-measure/edit/:id',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/units-of-measure-page/unit-of-measure-create-page/unit-of-measure-create-page'
          ).then((m) => m.UnitOfMeasureForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/warranties',
        loadComponent: () =>
          import('./pages/dashboard/catalog/warranties-page/warranties-page').then(
            (m) => m.WarrantiesPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/warranties/create-warranties',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/warranties-page/warranty-create-page/warranty-create-page'
          ).then((m) => m.WarrantyForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/warranties/edit/:id',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/warranties-page/warranty-create-page/warranty-create-page'
          ).then((m) => m.WarrantyForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/brands',
        loadComponent: () =>
          import('./pages/dashboard/catalog/brands-page/brands-page').then((m) => m.BrandsPage),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/brands/create-brands',
        loadComponent: () =>
          import('./pages/dashboard/catalog/brands-page/brand-create-page/brand-create-page').then(
            (m) => m.BrandFormPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/brands/edit/:id',
        loadComponent: () =>
          import('./pages/dashboard/catalog/brands-page/brand-create-page/brand-create-page').then(
            (m) => m.BrandFormPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/categories',
        loadComponent: () =>
          import('./pages/dashboard/catalog/categories-page/categories-page').then(
            (m) => m.CategoriesPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/categories/create-category',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/categories-page/category-create-page/category-create-page'
          ).then((m) => m.CategoryFormPage),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'catalog/categories/edit/:id',
        loadComponent: () =>
          import(
            './pages/dashboard/catalog/categories-page/category-create-page/category-create-page'
          ).then((m) => m.CategoryFormPage),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'inventory/product-stock',
        loadComponent: () =>
          import('./pages/dashboard/inventory/product-stock-page/product-stock-page').then(
            (m) => m.ProductStockPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },
      {
        path: 'inventory/stock-moves',
        loadComponent: () =>
          import('./pages/dashboard/inventory/stock-moves-page/stock-moves-page').then(
            (m) => m.StockMovesPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },
      {
        path: 'inventory/fifo-lots',
        loadComponent: () =>
          import('./pages/dashboard/inventory/fifo-lots-page/fifo-lots-page').then(
            (m) => m.FifoLotsPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },
      {
        path: 'inventory/invoices',
        loadComponent: () =>
          import('./pages/dashboard/inventory/invoices-page/invoices-page').then(
            (m) => m.InvoicesPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },
      {
        path: 'inventory/invoices/:id',
        loadComponent: () =>
          import('./pages/dashboard/inventory/invoices-page/invoice-details/invoice-details').then(
            (m) => m.InvoiceDetails
          ),
      },
      {
        path: 'inventory/vendors',
        loadComponent: () =>
          import('./pages/dashboard/inventory/vendors-page/vendors-page').then(
            (m) => m.VendorsPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },
      {
        path: 'inventory/purchase-lines',
        loadComponent: () =>
          import('./pages/dashboard/inventory/purchase-lines-page/purchase-lines-page').then(
            (m) => m.PurchaseLinesPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },
      {
        path: 'inventory/locations',
        loadComponent: () =>
          import('./pages/dashboard/inventory/locations-page/locations-page').then(
            (m) => m.LocationsPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },

      {
        path: 'accounts/users',
        loadComponent: () =>
          import('./pages/dashboard/accounts/users-page/users-page').then((m) => m.UsersPage),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },
      {
        path: 'accounts/users/create-user',
        loadComponent: () =>
          import('./pages/dashboard/accounts/users-page/users-create-page/users-create-page').then(
            (m) => m.UserCreatePage
          ),
      },
      {
        path: 'accounts/users/:id/edit',
        loadComponent: () =>
          import('./pages/dashboard/accounts/users-page/edit-page/edit-page').then(
            (m) => m.EditPage
          ),
      },
      {
        path: 'accounts/users/detail/:id',
        loadComponent: () =>
          import('./pages/dashboard/accounts/users-page/details-page/details-page').then(
            (m) => m.UserDetailPage
          ),
      },
      {
        path: 'accounts/group-and-roles',
        loadComponent: () =>
          import('./pages/dashboard/accounts/groups-and-roles-page/groups-and-roles-page').then(
            (m) => m.GroupsAndRolesPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },

      {
        path: 'translations',
        loadComponent: () =>
          import('./pages/dashboard/translations/translations-page/translations-page').then(
            (m) => m.TranslationsPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },

      {
        path: 'sync-logs',
        loadComponent: () =>
          import('./pages/dashboard/core/sync-logs-page/sync-logs-page').then(
            (m) => m.SyncLogsPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./pages/dashboard/offers/offers-page/offers-page').then((m) => m.OffersPage),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'offers/create',
        loadComponent: () => import('./shared/form/offer-form/offer-form').then((m) => m.OfferForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'offers/edit/:id',
        loadComponent: () => import('./shared/form/offer-form/offer-form').then((m) => m.OfferForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'offers/detail/:id',
        loadComponent: () =>
          import('./pages/dashboard/offers/offer-details-page/offer-details-page').then(
            (m) => m.OfferDetailsPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'sales/orders-list',
        loadComponent: () =>
          import('./pages/dashboard/sales/orders-list-page/orders-list-page/orders-list-page').then(
            (m) => m.OrdersListPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'sales/orders/create',
        loadComponent: () => import('./shared/form/order-form/order-form').then((m) => m.OrderForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'sales/orders/:id',
        loadComponent: () =>
          import('./pages/dashboard/sales/order-details-page/order-details-page').then(
            (m) => m.OrderDetailsPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'sales/orders/edit/:id',
        loadComponent: () => import('./shared/form/order-form/order-form').then((m) => m.OrderForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },

      {
        path: 'sales/sold-products',
        loadComponent: () =>
          import(
            './pages/dashboard/sales/sold-products-page/sold-products-page/sold-products-page'
          ).then((m) => m.SoldProductsPage),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },

      {
        path: 'sales/warehouse-fulfillment',
        loadComponent: () =>
          import(
            './pages/dashboard/sales/warehouse-fulfillment-page/warehouse-fulfillment-page'
          ).then((m) => m.WarehouseFulfillmentPage),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'sales/my-orders-list',
        loadComponent: () =>
          import('./pages/dashboard/sales/my-orders-list-page/my-orders-list-page').then(
            (m) => m.MyOrdersListPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },

      // cart
      {
        path: 'cart/cart-list',
        loadComponent: () =>
          import('./pages/dashboard/cart/carts-list-page/carts-list-page').then(
            (m) => m.CartsListPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'cart/edit/:id',
        loadComponent: () =>
          import('./pages/dashboard/cart/cart-form/cart-form').then((m) => m.CartForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'cart/create',
        loadComponent: () =>
          import('./pages/dashboard/cart/cart-form/cart-form').then((m) => m.CartForm),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },

      // project
      {
        path: 'projects/projects-list',
        loadComponent: () =>
          import('./pages/dashboard/projects/projects-list-page/projects-list-page').then(
            (m) => m.ProjectsListPage
          ),
        // canActivate: [RoleGuard],
        // data: { requiredGroup: 'Manager' },
      },
      {
        path: 'projects/my-projects-list',
        loadComponent: () =>
          import('./pages/dashboard/projects/my-projects-list-page/my-projects-list-page').then(
            (m) => m.MyProjectsListPage
          ),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'projects/my-projects-list/create-project',
        loadComponent: () =>
          import(
            './pages/dashboard/projects/my-projects-list-page/project-create-page/project-create-page'
          ).then((m) => m.ProjectFormPage),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
      {
        path: 'projects/my-projects-list/edit/:id',
        loadComponent: () =>
          import(
            './pages/dashboard/projects/my-projects-list-page/project-create-page/project-create-page'
          ).then((m) => m.ProjectFormPage),
        canActivate: [RoleGuard],
        data: { requiredGroup: 'Manager' },
      },
    ],
  },
];
