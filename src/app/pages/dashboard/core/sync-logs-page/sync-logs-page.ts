import { Component, computed, signal } from '@angular/core';
import { UiSelect, UiSelectOption } from '../../../../shared/ui/ui-select/ui-select';
import { CommonModule } from '@angular/common';
import {
  IntegrationsService,
  InvoiceSyncResult,
  SyncLog,
} from '../../../../core/services/integrations/integrations.service';

@Component({
  selector: 'app-sync-logs-page',
  standalone: true,
  imports: [CommonModule, UiSelect],
  templateUrl: './sync-logs-page.html',
})
export class SyncLogsPage {
  tab = signal<'ALL' | 'SUCCESS' | 'FAILED' | 'RUNNING'>('ALL');
  q = signal('');
  typeQ = signal('');
  status = signal<'ALL' | 'STARTED' | 'RUNNING' | 'SUCCESS' | 'FAILED'>('ALL');

  syncing = signal(false);
  lastResult = signal<InvoiceSyncResult | null>(null);
  errorMsg = signal<string | null>(null);

  // массив опций для ui-select
  statusOpts: UiSelectOption<'ALL' | 'STARTED' | 'RUNNING' | 'SUCCESS' | 'FAILED'>[] = [
    { label: 'All statuses', value: 'ALL' },
    { label: 'STARTED', value: 'STARTED' },
    { label: 'RUNNING', value: 'RUNNING' },
    { label: 'SUCCESS', value: 'SUCCESS' },
    { label: 'FAILED', value: 'FAILED' },
  ];

  rows = signal<SyncLog[]>([]);

  constructor(private integrationsService: IntegrationsService) {}

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.integrationsService.getSyncLogs().subscribe({
      next: (logs) => this.rows.set(logs.results), // <-- вот здесь
      error: (err) => console.error('Failed to load sync logs:', err),
    });
  }

  /** 🚀 Запуск синка */
  syncInvoices() {
    if (this.syncing()) return;

    this.syncing.set(true);
    this.errorMsg.set(null);
    this.lastResult.set(null);

    this.integrationsService.syncInvoices().subscribe({
      next: (res) => {
        this.lastResult.set(res);
        this.loadLogs(); // обновляем таблицу логов
      },
      error: (err) => {
        this.errorMsg.set(err?.error?.detail ?? 'Sync failed');
      },
      complete: () => {
        this.syncing.set(false);
      },
    });
  }

  view = computed(() => {
    const q = this.q().trim().toLowerCase();
    const st = this.status();
    const tab = this.tab();

    return this.rows().filter((r) => {
      const byTab = tab === 'ALL' ? true : r.status.toUpperCase() === tab;
      const byQ = !q || r.message.toLowerCase().includes(q) || r.user.toLowerCase().includes(q);
      const byStatus = st === 'ALL' ? true : r.status.toUpperCase() === st;
      return byTab && byQ && byStatus;
    });
  });

  badgeClass(status: string) {
    if (status === 'SUCCESS') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'FAILED') return 'bg-red-100 text-red-700 border-red-200';
    if (status === 'RUNNING' || status === 'STARTED')
      return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  }
  // 🔹 метод apply чтобы TS не ругался
  apply() {
    // фильтры уже реактивные, ничего делать не нужно
  }
  reset() {
    this.q.set('');
    this.typeQ.set('');
    this.status.set('ALL');
    this.tab.set('ALL');
  }
}
