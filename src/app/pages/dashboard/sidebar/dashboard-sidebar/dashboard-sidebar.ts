import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthStore } from '../../../../core/services/auth.store';

type NavItem = { label: string; to: string; requiredGroup?: string };
type NavGroup = { key: string; label: string; icon?: string; items: NavItem[] };

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-sidebar.html',
})
export class DashboardSidebar {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  groups: NavGroup[] = [
    {
      key: 'profile',
      label: 'Profile',
      items: [
        { label: 'Profile', to: '/dashboard/profile' },
        { label: 'Profile settings', to: '/dashboard/profile-settings' },
      ],
    },
    {
      key: 'catalog',
      label: 'Catalog',
      items: [
        { label: 'Products', to: '/dashboard/catalog/products', requiredGroup: 'Manager' },
        {
          label: 'UOM Categories',
          to: '/dashboard/catalog/uom-categories',
          requiredGroup: 'Manager',
        },
        {
          label: 'Units of Measure',
          to: '/dashboard/catalog/units-of-measure',
          requiredGroup: 'Manager',
        },
        { label: 'Warranties', to: '/dashboard/catalog/warranties', requiredGroup: 'Manager' },
        { label: 'Brands', to: '/dashboard/catalog/brands', requiredGroup: 'Manager' },
        { label: 'Categories', to: '/dashboard/catalog/categories', requiredGroup: 'Manager' },
      ],
    },
    {
      key: 'inventory',
      label: 'Inventory',
      items: [
        {
          label: 'Product Stock',
          to: '/dashboard/inventory/product-stock',
          requiredGroup: 'Manager',
        },
        { label: 'Stock Moves', to: '/dashboard/inventory/stock-moves', requiredGroup: 'Manager' },
        { label: 'FIFO Lots', to: '/dashboard/inventory/fifo-lots', requiredGroup: 'Manager' },
        { label: 'Invoices', to: '/dashboard/inventory/invoices', requiredGroup: 'Manager' },
        { label: 'Vendors', to: '/dashboard/inventory/vendors', requiredGroup: 'Manager' },
        {
          label: 'Purchase Lines',
          to: '/dashboard/inventory/purchase-lines',
          requiredGroup: 'Manager',
        },
        { label: 'Locations', to: '/dashboard/inventory/locations', requiredGroup: 'Manager' },
      ],
    },
    {
      key: 'accounts',
      label: 'Accounts',
      items: [
        { label: 'Users', to: '/dashboard/accounts/users', requiredGroup: 'Manager' },
        {
          label: 'Group & Roles',
          to: '/dashboard/accounts/group-and-roles',
          requiredGroup: 'Manager',
        },
      ],
    },
    {
      key: 'translations',
      label: 'Translations',
      items: [
        { label: 'Manage Translations', to: '/dashboard/translations', requiredGroup: 'Manager' },
        { label: 'Rosetta Editor', to: '/dashboard/rosseta', requiredGroup: 'Manager' },
      ],
    },
    {
      key: 'core',
      label: 'Core',
      items: [{ label: 'Sync Logs', to: '/dashboard/sync-logs', requiredGroup: 'Manager' }],
    },
    {
      key: 'Offers',
      label: 'Offers',
      items: [{ label: 'Offers', to: '/dashboard/offers', requiredGroup: 'Manager' }],
    },
    {
      key: 'sales',
      label: 'Sales',
      items: [
        { label: 'Orders list', to: '/dashboard/sales/orders-list', requiredGroup: 'Manager' },
        { label: 'Sold products', to: '/dashboard/sales/sold-products', requiredGroup: 'Manager' },
        {
          label: 'Warehouse Fulfillment',
          to: '/dashboard/sales/warehouse-fulfillment',
          requiredGroup: 'Manager',
        },
        {
          label: 'My orders list',
          to: '/dashboard/sales/my-orders-list',
          requiredGroup: 'Manager',
        },
      ],
    },
    {
      key: 'cart',
      label: 'Cart',
      items: [
        { label: 'Carts list', to: '/dashboard/cart/cart-list', requiredGroup: 'Manager' },
        { label: 'My carts list', to: '/dashboard/cart/my-carts-list', requiredGroup: 'Manager' },
      ],
    },
    {
      key: 'projects',
      label: 'Projects',
      items: [
        {
          label: 'Projects list',
          to: '/dashboard/projects/projects-list',
          requiredGroup: 'Manager',
        },
        {
          label: 'My projects list',
          to: '/dashboard/projects/my-projects-list',
          requiredGroup: 'Manager',
        },
      ],
    },
  ];

  // раскрытые секции
  open = signal<Record<string, boolean>>({
    catalog: true,
    inventory: true,
    accounts: false,
  });

  // фильтруем элементы по группам пользователя
  filteredGroups = computed(() => {
    const userGroups = this.authStore.user()?.groups ?? [];
    return this.groups
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => !i.requiredGroup || userGroups.includes(i.requiredGroup)),
      }))
      .filter((g) => g.items.length > 0); // <-- убираем группы без доступных элементов
  });

  toggle(key: string) {
    this.open.update((v) => ({ ...v, [key]: !v[key] }));
  }

  // auto-open секции по текущему url
  activeGroupKey = computed(() => {
    const url = this.router.url;
    const found = this.filteredGroups().find((g) =>
      g.items.some((i) => url.startsWith(i.to.replace(/\/[^/]+$/, '')) || url.startsWith(i.to))
    );
    return found?.key ?? null;
  });
}
