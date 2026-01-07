import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

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
  selector: 'app-projects-list-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-list-page.html',
})
export class ProjectsListPage {
  tab = signal<TabKey>('ALL');
  search = signal('');

  rows = signal<ProjectRow[]>([
    {
      name: 'Deye test',
      powerKwh: 1,
      assigneeInitial: 'T',
      startDate: 'Dec 21, 2025',
      deadline: '—',
      totalPriceMdl: null,
      status: 'PLANNING',
    },
    {
      name: '—',
      powerKwh: 1,
      assigneeInitial: 'T',
      startDate: 'Dec 09, 2025',
      deadline: 'Dec 31, 2025',
      totalPriceMdl: 157424.54,
      status: 'PLANNING',
    },
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
