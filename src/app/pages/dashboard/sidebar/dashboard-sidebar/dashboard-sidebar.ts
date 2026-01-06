import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

type NavItem = { label: string; to: string };
type NavGroup = { key: string; label: string; icon?: string; items: NavItem[] };

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-sidebar.html',
})
export class DashboardSidebar {
  private router = inject(Router);

  groups: NavGroup[] = [
    {
      key: 'catalog',
      label: 'Catalog',
      items: [
        { label: 'Products', to: '/dashboard/catalog/products' },
        { label: 'UOM Categories', to: '/dashboard/catalog/uom-categories' },
        { label: 'Units of Measure', to: '/dashboard/catalog/units-of-measure' },
        { label: 'Warranties', to: '/dashboard/catalog/warranties' },
        { label: 'Brands', to: '/dashboard/catalog/brands' },
        { label: 'Categories', to: '/dashboard/catalog/categories' },
      ],
    },
    {
      key: 'inventory',
      label: 'Inventory',
      items: [
        { label: 'Product Stock', to: '/dashboard/inventory/product-stock' },
        { label: 'Stock Moves', to: '/dashboard/inventory/stock-moves' },
        { label: 'FIFO Lots', to: '/dashboard/inventory/fifo-lots' },
        { label: 'Invoices', to: '/dashboard/inventory/invoices' },
        { label: 'Vendors', to: '/dashboard/inventory/vendors' },
        { label: 'Purchase Lines', to: '/dashboard/inventory/purchase-lines' },
        { label: 'Locations', to: '/dashboard/inventory/locations' },
      ],
    },
    {
      key: 'accounts',
      label: 'Accounts',
      items: [
        { label: 'Users', to: '/dashboard/accounts/users' },
        { label: 'Group & Roles', to: '/dashboard/accounts/group-and-roles' },
      ],
    },
    {
      key: 'translations',
      label: 'Translations',
      items: [
        { label: 'Manage Translations', to: '/dashboard/translations' },
        { label: 'Rosetta Editor', to: '/dashboard/rosseta' },
      ],
    },
    {
      key: 'core',
      label: 'Core',
      items: [{ label: 'Sync Logs', to: '/dashboard/sync-logs' }],
    },
    {
      key: 'Offers',
      label: 'Offers',
      items: [{ label: 'Offers', to: '/dashboard/offers' }],
    },
    {
      key: 'sales',
      label: 'Sales',
      items: [
        { label: 'Orders list', to: '/dashboard/sales/orders-list' },
        { label: 'Sold products', to: '/dashboard/sales/sold-products' },
        { label: 'Warehouse Fulfillment', to: '/dashboard/sales/warehouse-fulfillment' },
        { label: 'My orders list', to: '/dashboard/sales/my-orders-list' },
      ],
    },
    {
      key: 'cart',
      label: 'Cart',
      items: [
        { label: 'Carts list', to: '/dashboard/cart/carts-list' },
        { label: 'My carts list', to: '/dashboard/cart/my-carts-list' },
      ],
    },
    {
      key: 'projects',
      label: 'Projects',
      items: [
        { label: 'Projects list', to: '/dashboard/projects/projects-list' },
        { label: 'My projects list', to: '/dashboard/projects/my-projects-list' },
      ],
    },
  ];

  // раскрытые секции
  open = signal<Record<string, boolean>>({
    catalog: true,
    inventory: true,
    accounts: false,
  });

  // auto-open секции по текущему url
  activeGroupKey = computed(() => {
    const url = this.router.url;
    const found = this.groups.find((g) =>
      g.items.some((i) => url.startsWith(i.to.replace(/\/[^/]+$/, '')) || url.startsWith(i.to))
    );
    return found?.key ?? null;
  });

  toggle(key: string) {
    this.open.update((v) => ({ ...v, [key]: !v[key] }));
  }
}
