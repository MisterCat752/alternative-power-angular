import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';

export type UiSwiperBreakpoints = Record<number, any>;

export interface UiSwiperOptions {
  slidesPerView?: number;
  spaceBetween?: number;
  navigation?: boolean;
  pagination?: boolean;
  loop?: boolean;

  autoplayDelay?: number;
  autoplayDisableOnInteraction?: boolean;

  breakpoints?: UiSwiperBreakpoints;
  className?: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Slider<T = any> implements AfterViewInit, OnChanges {
  @ViewChild('swiperEl', { static: false }) swiperEl?: ElementRef<any>;

  @Input({ required: true }) items!: T[];
  @Input({ required: true }) itemTpl!: TemplateRef<{ $implicit: T; index: number }>;

  @Input() options: UiSwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: true,
    pagination: true,
    loop: true,
    autoplayDelay: 2500,
    autoplayDisableOnInteraction: false,
  };

  @Input() trackBy: (item: T) => any = (item) => item;

  isBrowser = false;
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initOrUpdate(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isBrowser) return;
    if (this.initialized && (changes['items'] || changes['options'])) {
      this.initOrUpdate(false);
    }
  }

  private initOrUpdate(firstInit: boolean) {
    const el = this.swiperEl?.nativeElement;
    if (!el) return;

    const o = this.options ?? {};

    Object.assign(el, {
      slidesPerView: o.slidesPerView ?? 1,
      spaceBetween: o.spaceBetween ?? 16,
      loop: !!o.loop,
      navigation: !!o.navigation,
      pagination: o.pagination ? { clickable: true } : false,
      autoplay: o.autoplayDelay
        ? { delay: o.autoplayDelay, disableOnInteraction: o.autoplayDisableOnInteraction ?? false }
        : false,
      breakpoints: o.breakpoints ?? undefined,
    });

    if (firstInit && !this.initialized) {
      el.initialize();
      this.initialized = true;
    } else {
      // обновление после смены items/options
      el.swiper?.update?.();
    }
  }
}
