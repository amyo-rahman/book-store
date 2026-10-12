import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { aBook, FakeBookRepository } from '../../../testing/fake-book.repository';
import { BookRepository } from '../../core/ports/book.repository';
import { BookFilterStore } from './book-filter.store';
import { BooksStore } from './books.store';

describe('BooksStore', () => {
  it('should reload with only the selected genre when the filter changes', async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BookRepository,
          useValue: new FakeBookRepository([
            aBook({ id: '1', title: 'Dune', genre: 'SciFi' }),
            aBook({ id: '2', title: 'The Hobbit', genre: 'Fantasy' }),
          ]),
        },
      ],
    });
    const store = TestBed.inject(BooksStore);
    const filter = TestBed.inject(BookFilterStore);
    const app = TestBed.inject(ApplicationRef);

    await app.whenStable();
    expect(store.books().map((b) => b.title)).toEqual(['Dune', 'The Hobbit']);

    filter.setGenre('Fantasy');
    await app.whenStable();
    expect(store.books().map((b) => b.title)).toEqual(['The Hobbit']);

    filter.setGenre(null);
    await app.whenStable();
    expect(store.books()).toHaveLength(2);
  });
});
