import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';

import { UsersService } from '../../../../core/services/users/users.service';
import { User, UserGroup } from '../../../../core/models/users/user.model';

/* =======================
   UI TYPES
======================= */

type UserStatus = 'ACTIVE' | 'INACTIVE';
type UserType = 'INDIVIDUAL';
type Role = 'ADMIN' | 'CUSTOMER' | 'MANAGER';

type UserRow = {
  id: string;
  name: string;
  email: string;
  type: UserType;
  roles: Role[];
  joined: string;
  lastSeen: string;
  status: UserStatus;
  avatar?: string;
};

/* =======================
   ROLE → API GROUP MAP
======================= */

const ROLE_TO_GROUP_MAP: Record<Role, UserGroup> = {
  ADMIN: 'Admin',
  CUSTOMER: 'Customer',
  MANAGER: 'Manager',
};

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UiSelect, RouterLink],
  templateUrl: './users-page.html',
})
export class UsersPage {
  private usersService = inject(UsersService);

  /* =======================
     UI STATE
  ======================= */

  tab = signal<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  search = signal('');

  statusFilter = signal<'ALL' | UserStatus>('ALL');
  roleFilter = signal<'ALL' | Role>('ALL');

  page = signal(1);
  pageSize = signal(25);

  rows = signal<UserRow[]>([]);
  total = signal(0);
  loading = signal(false);

  /* =======================
     SELECT OPTIONS
  ======================= */

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

  /* =======================
     API LOAD
  ======================= */

  loadUsers = effect(() => {
    this.loading.set(true);

    const role = this.roleFilter();

    this.usersService
      .getUsers({
        page: this.page(),
        page_size: this.pageSize(),
        search: this.search() || undefined,
        groups: role === 'ALL' ? undefined : [ROLE_TO_GROUP_MAP[role]],
      })
      .subscribe({
        next: (res) => {
          this.rows.set(res.results.map(this.mapUser));
          this.total.set(res.count);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  });

  /* =======================
     ADAPTER (API → UI)
  ======================= */

  private mapUser = (u: User): UserRow => ({
    id: u.id,
    name: `${u.first_name} ${u.last_name}`.trim(),
    email: u.email,
    type: 'INDIVIDUAL',
    roles: u.groups as Role[],
    joined: this.formatDate(u.date_joined),
    lastSeen: '—',
    status: u.is_active ? 'ACTIVE' : 'INACTIVE',
    avatar: undefined,
  });

  /* =======================
     LOCAL FILTERING
  ======================= */

  filtered = computed(() => {
    return this.rows().filter((u) => {
      const byTab = this.tab() === 'ALL' ? true : u.status === this.tab();
      const byStatus = this.statusFilter() === 'ALL' ? true : u.status === this.statusFilter();

      return byTab && byStatus;
    });
  });

  /* =======================
     COUNTERS
  ======================= */

  totalUsers = computed(() => this.total());

  activeUsers = computed(() => this.rows().filter((u) => u.status === 'ACTIVE').length);

  inactiveUsers = computed(() => this.rows().filter((u) => u.status === 'INACTIVE').length);

  admins = computed(() => this.rows().filter((u) => u.roles.includes('ADMIN')).length);

  /* =======================
     HELPERS
  ======================= */

  initials(name: string) {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((x) => x[0].toUpperCase())
      .join('');
  }

  private formatDate(date: string) {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  }
}
