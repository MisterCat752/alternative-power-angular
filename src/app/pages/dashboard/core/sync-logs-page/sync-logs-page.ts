import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';

type LogStatus = 'STARTED' | 'SUCCESS' | 'FAILED' | 'RUNNING';
type LogSource = 'CORE' | 'CATALOG' | 'INVENTORY';

type LogRow = {
  source: LogSource;
  type: string;
  status: LogStatus;
  started: string;
  completed: string;
  userEmail: string;
  recordsPlus: number;
  recordsMinus: number;
  recordsErr: number;
  message: string;
};

type Tab = 'ALL' | 'SUCCESS' | 'FAILED' | 'RUNNING';

@Component({
  selector: 'app-sync-logs-page',
  standalone: true,
  imports: [CommonModule, UiSelect],
  templateUrl: './sync-logs-page.html',
})
export class SyncLogsPage {
  tab = signal<Tab>('ALL');

  q = signal('');
  typeQ = signal('');
  status = signal<LogStatus | 'ALL'>('ALL');

  statusOpts: UiSelectOption<LogStatus | 'ALL'>[] = [
    { label: 'All statuses', value: 'ALL' },
    { label: 'STARTED', value: 'STARTED' },
    { label: 'RUNNING', value: 'RUNNING' },
    { label: 'SUCCESS', value: 'SUCCESS' },
    { label: 'FAILED', value: 'FAILED' },
  ];

  rows = signal<LogRow[]>([
    {
      source: 'CORE',
      type: 'invoices',
      status: 'STARTED',
      started: 'Дек 26, 18:34',
      completed: '—',
      userEmail: 'gherasimovalexandru@hotmail.com',
      recordsPlus: 0,
      recordsMinus: 0,
      recordsErr: 0,
      message: 'Sync started…',
    },
    {
      source: 'CORE',
      type: 'products',
      status: 'SUCCESS',
      started: 'Дек 15, 00:28',
      completed: 'Дек 15, 00:28',
      userEmail: 'gherasimovalexandru@hotmail.com',
      recordsPlus: 0,
      recordsMinus: 0,
      recordsErr: 0,
      message: 'Syncing currency/invoice from invoices… refreshing prices…',
    },
    {
      source: 'CORE',
      type: 'invoices',
      status: 'SUCCESS',
      started: 'Дек 12, 22:49',
      completed: 'Дек 12, 22:49',
      userEmail: 'gherasimovalexandru@hotmail.com',
      recordsPlus: 0,
      recordsMinus: 360,
      recordsErr: 10,
      message: 'Imported invoices: +/-360; lines: +/-1418; skipped 0',
    },
    {
      source: 'CORE',
      type: 'products',
      status: 'FAILED',
      started: 'Дек 11, 10:12',
      completed: 'Дек 11, 10:13',
      userEmail: 'gherasimovalexandru@hotmail.com',
      recordsPlus: 0,
      recordsMinus: 0,
      recordsErr: 1,
      message: 'Request timeout on vendor API.',
    },
  ]);

  view = computed(() => {
    const q = this.q().trim().toLowerCase();
    const tq = this.typeQ().trim().toLowerCase();
    const st = this.status();

    return this.rows().filter((r) => {
      const byTab = this.tab() === 'ALL' ? true : r.status === this.tab();
      const byQ =
        !q || r.message.toLowerCase().includes(q) || r.userEmail.toLowerCase().includes(q);
      const byType = !tq || r.type.toLowerCase().includes(tq);
      const byStatus = st === 'ALL' ? true : r.status === st;
      return byTab && byQ && byType && byStatus;
    });
  });

  apply() {
    // тут ничего не нужно — фильтры реактивные, но кнопка на скрине есть
  }

  reset() {
    this.q.set('');
    this.typeQ.set('');
    this.status.set('ALL');
    this.tab.set('ALL');
  }

  badgeClass(s: LogStatus) {
    if (s === 'SUCCESS') return 'bg-green-100 text-green-700 border-green-200';
    if (s === 'FAILED') return 'bg-red-100 text-red-700 border-red-200';
    if (s === 'RUNNING') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}
