import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { BookDto } from '../dto/book.dto';
import { API_BASE_URL } from './api-base-url';
import { HttpBookRepository } from './http-book.repository';

describe('HttpBookRepository', () => {
  let repository: HttpBookRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
        HttpBookRepository,
      ],
    });
    repository = TestBed.inject(HttpBookRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should get books and map dates', async () => {
    const dto: BookDto = {
      id: '1',
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '9780441172719',
      publishedYear: 1965,
      coverUrl: null,
      openLibraryKey: null,
      description: null,
      genre: 'SciFi',
      price: 18.99,
      stock: 12,
      createdAt: '2026-10-01T09:00:00+00:00',
      updatedAt: '2026-10-01T09:00:00+00:00',
    };

    const result = firstValueFrom(repository.list());
    http.expectOne({ method: 'GET', url: '/api/books' }).flush([dto]);
    const [book] = await result;

    expect(book.title).toBe('Dune');
    expect(book.createdAt).toEqual(new Date('2026-10-01T09:00:00Z'));
  });

  it('should get genre counts', async () => {
    const result = firstValueFrom(repository.genreCounts());
    http.expectOne({ method: 'GET', url: '/api/books/genres' }).flush([{ genre: 'SciFi', count: 5 }]);

    expect(await result).toEqual([{ genre: 'SciFi', count: 5 }]);
  });
});
