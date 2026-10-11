import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { API_BASE_URL } from './infrastructure/http/api-base-url';
import { BookStoreTheme } from './presentation/theme';
import { PRIMEUI_LICENSE } from './primeui-license';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: API_BASE_URL, useValue: '/api' },
    providePrimeNG({
      license: PRIMEUI_LICENSE,
      theme: {
        preset: BookStoreTheme,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: { name: 'primeng', order: 'theme, base, primeng' },
        },
      },
    }),
  ],
};
