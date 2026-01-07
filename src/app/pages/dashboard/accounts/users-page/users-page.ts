import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';

type UserStatus = 'ACTIVE' | 'INACTIVE';
type UserType = 'INDIVIDUAL' | 'COMPANY';
type Role = 'ADMIN' | 'CUSTOMER' | 'MANAGER';

type UserRow = {
  id: string;
  name: string;
  email: string;
  type: UserType;
  roles: Role[];
  joined: string; // "Дек 3, 2025"
  lastSeen: string; // "1 месяц ago"
  status: UserStatus;
  avatarUrl?: string;
};

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UiSelect],
  templateUrl: './users-page.html',
})
export class UsersPage {
  tab = signal<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  search = signal('');

  statusFilter = signal<'ALL' | UserStatus>('ALL');
  roleFilter = signal<'ALL' | Role>('ALL');

  statusOpts: UiSelectOption<'ALL' | UserStatus>[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Inactive', value: 'INACTIVE' },
  ];

  roleOpts: UiSelectOption<'ALL' | Role>[] = [
    { label: 'All roles', value: 'ALL' },
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Customer', value: 'CUSTOMER' },
    { label: 'Manager', value: 'MANAGER' },
  ];

  rows = signal<UserRow[]>([
    {
      id: 'u1',
      name: 'Simion Taut',
      email: 'tautsimion@gmail.com',
      type: 'INDIVIDUAL',
      roles: ['CUSTOMER'],
      joined: 'Дек 3, 2025',
      lastSeen: '1 месяц ago',
      status: 'ACTIVE',
      avatarUrl: 'https://i.pravatar.cc/80?img=12',
    },
    {
      id: 'u2',
      name: 'Tatiana Hacina',
      email: 'tatiaccount@gmail.com',
      type: 'INDIVIDUAL',
      roles: ['CUSTOMER'],
      joined: 'Дек 1, 2025',
      lastSeen: '1 месяц, 1 неделя ago',
      status: 'ACTIVE',
    },
    {
      id: 'u3',
      name: 'Alexandru Gherasimov',
      email: 'gherasimovalexandru@gmail.com',
      type: 'INDIVIDUAL',
      roles: ['ADMIN'],
      joined: 'Ноя 26, 2025',
      lastSeen: '11 часов, 8 минут ago',
      status: 'ACTIVE',
    },
    {
      id: 'u4',
      name: 'Ion Taut',
      email: 'taution4@gmail.com',
      type: 'INDIVIDUAL',
      roles: ['ADMIN'],
      joined: 'Ноя 16, 2025',
      lastSeen: '7 часов, 6 минут ago',
      status: 'ACTIVE',
    },
    {
      id: 'u5',
      name: 'Alexandru Gherasimov',
      email: 'gherasimovalexandru@hotmail.com',
      type: 'INDIVIDUAL',
      roles: [],
      joined: 'Окт 19, 2025',
      lastSeen: '3 часа, 49 минут ago',
      status: 'ACTIVE',
    },
  ]);

  totalUsers = computed(() => this.rows().length);
  activeUsers = computed(() => this.rows().filter((u) => u.status === 'ACTIVE').length);
  inactiveUsers = computed(() => this.rows().filter((u) => u.status === 'INACTIVE').length);
  admins = computed(() => this.rows().filter((u) => u.roles.includes('ADMIN')).length);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();

    return this.rows().filter((u) => {
      const byTab = this.tab() === 'ALL' ? true : u.status === this.tab();
      const bySearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);

      const byStatus = this.statusFilter() === 'ALL' ? true : u.status === this.statusFilter();

      const byRole =
        this.roleFilter() === 'ALL' ? true : u.roles.includes(this.roleFilter() as Role);

      return byTab && bySearch && byStatus && byRole;
    });
  });

  initials(name: string) {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((x) => x[0]?.toUpperCase())
      .join('');
  }
}
