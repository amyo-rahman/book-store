import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { BookRepository } from './core/ports/book.repository';
import { CatalogRepository } from './core/ports/catalog.repository';
import { API_BASE_URL } from './infrastructure/http/api-base-url';
import { HttpBookRepository } from './infrastructure/http/http-book.repository';
import { HttpCatalogRepository } from './infrastructure/http/http-catalog.repository';
import { BookStoreTheme } from './presentation/theme';
import { PRIMEUI_LICENSE } from './primeui-license';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    { provide: API_BASE_URL, useValue: '/api' },
    { provide: BookRepository, useClass: HttpBookRepository },
    { provide: CatalogRepository, useClass: HttpCatalogRepository },
    MessageService,
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
