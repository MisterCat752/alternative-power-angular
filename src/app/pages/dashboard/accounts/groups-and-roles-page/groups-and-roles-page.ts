import { Component, computed, signal } from '@angular/core';

type GroupRow = {
  id: string;
  name: string;
  users: number;
  permissions: number;
  keyPermissions: string[];
  extraPermissions: number; // +N
};

@Component({
  selector: 'app-groups-and-roles-page',
  standalone: true,
  templateUrl: './groups-and-roles-page.html',
})
export class GroupsAndRolesPage {
  search = signal('');

  rows = signal<GroupRow[]>([
    {
      id: 'g1',
      name: 'Admin',
      users: 2,
      permissions: 120,
      keyPermissions: ['ADD_USER', 'CAN_ACCESS_DASHBOARD', 'CHANGE_OWN_PROFILE', 'CHANGE_USER'],
      extraPermissions: 116,
    },
    {
      id: 'g2',
      name: 'Customer',
      users: 2,
      permissions: 8,
      keyPermissions: ['CHANGE_OWN_PROFILE', 'CHANGE_USER', 'VIEW_OWN_PROFILE', 'VIEW_USER'],
      extraPermissions: 4,
    },
    {
      id: 'g3',
      name: 'Manager',
      users: 0,
      permissions: 19,
      keyPermissions: ['CHANGE_OWN_PROFILE', 'CHANGE_USER', 'VIEW_OWN_PROFILE', 'VIEW_USER'],
      extraPermissions: 15,
    },
    {
      id: 'g4',
      name: 'Product Manager',
      users: 0,
      permissions: 25,
      keyPermissions: ['ADD_BRAND', 'CHANGE_BRAND', 'DELETE_BRAND', 'VIEW_BRAND'],
      extraPermissions: 21,
    },
  ]);

  totalGroups = computed(() => this.rows().length);
  totalUsers = computed(() => this.rows().reduce((acc, r) => acc + r.users, 0));
  activeGroups = computed(() => this.rows().filter((r) => r.users > 0).length);
  avgPerms = computed(() => {
    const n = this.rows().length || 1;
    return Math.round(this.rows().reduce((acc, r) => acc + r.permissions, 0) / n);
  });

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.rows().filter((g) => !q || g.name.toLowerCase().includes(q));
  });
}
