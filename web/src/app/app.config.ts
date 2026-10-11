import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { BookRepository } from './core/ports/book.repository';
import { API_BASE_URL } from './infrastructure/http/api-base-url';
import { HttpBookRepository } from './infrastructure/http/http-book.repository';
import { BookStoreTheme } from './presentation/theme';
import { PRIMEUI_LICENSE } from './primeui-license';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    { provide: API_BASE_URL, useValue: '/api' },
    { provide: BookRepository, useClass: HttpBookRepository },
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
