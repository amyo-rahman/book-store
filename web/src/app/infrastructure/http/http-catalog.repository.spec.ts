import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { CatalogItemDto } from '../dto/catalog.dto';
import { API_BASE_URL } from './api-base-url';
import { HttpCatalogRepository } from './http-catalog.repository';

describe('HttpCatalogRepository', () => {
  let repository: HttpCatalogRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
        HttpCatalogRepository,
      ],
    });
    repository = TestBed.inject(HttpCatalogRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should search the catalog with the query', async () => {
    const dto: CatalogItemDto = {
      openLibraryKey: '/works/OL893415W',
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '9780441172719',
      publishedYear: 1965,
      coverUrl: null,
    };

    const result = firstValueFrom(repository.search('dune'));
    const request = http.expectOne((r) => r.url === '/api/catalog/search');
    expect(request.request.params.get('q')).toBe('dune');
    request.flush([dto]);

    expect(await result).toEqual([dto]);
  });
});
