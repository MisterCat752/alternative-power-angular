import { Component, computed, signal } from '@angular/core';

type LangCode = 'ro' | 'ru' | 'en';

type LangCard = {
  code: LangCode;
  name: string;
  total: number;
  translated: number;
  remaining: number;
};

type UrlRow = { code: LangCode; name: string; url: string };

@Component({
  selector: 'app-translations-page',
  standalone: true,
  templateUrl: './translations-page.html',
})
export class TranslationsPage {
  cards = signal<LangCard[]>([
    { code: 'ro', name: 'Română', total: 0, translated: 0, remaining: 0 },
    { code: 'ru', name: 'Русский', total: 0, translated: 0, remaining: 0 },
    { code: 'en', name: 'English', total: 0, translated: 0, remaining: 0 },
  ]);

  urls = signal<UrlRow[]>([
    { code: 'ro', name: 'Română', url: '/ro' },
    { code: 'ru', name: 'Русский', url: '/ru' },
    { code: 'en', name: 'English', url: '/en' },
  ]);

  // Map прогресса, чтобы в HTML не было find/??/?.
  progressByCode = computed(() => {
    const map: Record<string, number> = {};
    for (const c of this.cards()) {
      map[c.code] = c.total ? Math.round((c.translated / c.total) * 100) : 0;
    }
    return map as Record<LangCode, number>;
  });

  getProgress(code: LangCode) {
    return this.progressByCode()[code] ?? 0;
  }

  onOpenRosetta() {
    console.log('Open Rosetta Editor');
  }

  onTranslate(code: LangCode) {
    console.log('Translate', code);
  }

  onVisit(url: string) {
    window.open(url, '_blank');
  }
}
