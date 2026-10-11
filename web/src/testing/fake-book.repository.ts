import { Observable, of } from 'rxjs';
import { Book } from '../app/core/models/book';
import { GenreCount } from '../app/core/models/genre-count';
import { BookRepository } from '../app/core/ports/book.repository';

export class FakeBookRepository extends BookRepository {
  constructor(
    private readonly books: Book[] = [],
    private readonly counts: GenreCount[] = [],
  ) {
    super();
  }

  list(): Observable<Book[]> {
    return of(this.books);
  }

  genreCounts(): Observable<GenreCount[]> {
    return of(this.counts);
  }
}

export function aBook(overrides: Partial<Book> = {}): Book {
  return {
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
    createdAt: new Date('2026-10-01T09:00:00Z'),
    updatedAt: new Date('2026-10-01T09:00:00Z'),
    ...overrides,
  };
}
