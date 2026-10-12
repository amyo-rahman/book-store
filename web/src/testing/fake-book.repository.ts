import { Observable, of } from 'rxjs';
import { Book } from '../app/core/models/book';
import { Genre } from '../app/core/models/genre';
import { GenreCount } from '../app/core/models/genre-count';
import { NewBook } from '../app/core/models/new-book';
import { BookRepository } from '../app/core/ports/book.repository';

export class FakeBookRepository extends BookRepository {
  constructor(
    private readonly books: Book[] = [],
    private readonly counts: GenreCount[] = [],
  ) {
    super();
  }

  list(genre: Genre | null = null): Observable<Book[]> {
    return of(genre ? this.books.filter((b) => b.genre === genre) : this.books);
  }

  genreCounts(): Observable<GenreCount[]> {
    return of(this.counts);
  }

  add(book: NewBook): Observable<Book> {
    return of(
      aBook({
        id: 'new',
        ...book.item,
        genre: book.genre,
        price: book.price,
        stock: book.stock,
        description: book.description,
      }),
    );
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
