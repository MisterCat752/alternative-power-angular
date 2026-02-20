import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthStore } from '../../../../core/services/auth.store';
import { MatIcon } from '@angular/material/icon';

type NavItem = { label: string; to: string; requiredGroup?: string };
type NavGroup = { key: string; label: string; icon?: string; items: NavItem[] };

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './dashboard-sidebar.html',
})
export class DashboardSidebar {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  mobileOpen = signal(false);
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
        { label: 'Products', to: '/dashboard/catalog/products' },
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
        { label: 'Warranties', to: '/dashboard/catalog/warranties' },
        { label: 'Brands', to: '/dashboard/catalog/brands' },
        { label: 'Categories', to: '/dashboard/catalog/categories' },
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
        items: g.items, //.filter((i) => !i.requiredGroup || userGroups.includes(i.requiredGroup)),
      }))
      .filter((g) => g.items.length > 0); // <-- убираем группы без доступных элементов
  });

  toggle(key: string) {
    this.open.update((v) => ({ ...v, [key]: !v[key] }));
  }
  toggleMobile() {
    this.mobileOpen.set(!this.mobileOpen());
  }
  // auto-open секции по текущему url
  activeGroupKey = computed(() => {
    const url = this.router.url;
    const found = this.filteredGroups().find((g) =>
      g.items.some((i) => url.startsWith(i.to.replace(/\/[^/]+$/, '')) || url.startsWith(i.to)),
    );
    return found?.key ?? null;
  });
}
