import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type ProjectStatus = 'PLANNING' | 'ONGOING' | 'CANCELLED' | 'FINISHED' | 'POSTPONED';

type ProjectRow = {
  name: string;
  powerKwh: number;
  assigneeInitial: string;
  startDate: string;
  deadline: string;
  totalPriceMdl: number | null;
  status: ProjectStatus;
};

type TabKey = 'ALL' | 'ONGOING' | 'CANCELLED' | 'FINISHED' | 'POSTPONED';

@Component({
  selector: 'app-my-projects-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-projects-list-page.html',
})
export class MyProjectsListPage {
  tab = signal<TabKey>('ALL');
  search = signal('');

  rows = signal<ProjectRow[]>([
    {
      name: 'meganet',
      powerKwh: 10,
      assigneeInitial: 'T',
      startDate: '—',
      deadline: '—',
      totalPriceMdl: 217606.92,
      status: 'PLANNING',
    },
  ]);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const t = this.tab();

    return this.rows().filter((r) => {
      const byTab = t === 'ALL' ? true : r.status === t;
      const bySearch = !q || r.name.toLowerCase().includes(q);
      return byTab && bySearch;
    });
  });
}
