import {
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { register } from 'swiper/element/bundle';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        if (isPlatformBrowser(inject(PLATFORM_ID))) {
          register();
        }
      },
    },
  ],
};
