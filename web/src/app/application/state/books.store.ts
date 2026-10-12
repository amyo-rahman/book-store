import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';
import { Book } from '../../core/models/book';
import { NewBook } from '../../core/models/new-book';
import { BookRepository } from '../../core/ports/book.repository';
import { BookFilterStore } from './book-filter.store';
import { GenreCountsStore } from './genre-counts.store';

@Injectable({ providedIn: 'root' })
export class BooksStore {
  private readonly repository = inject(BookRepository);
  private readonly filter = inject(BookFilterStore);
  private readonly genreCounts = inject(GenreCountsStore);
  private readonly resource = rxResource({
    params: () => ({ genre: this.filter.genre() }),
    stream: ({ params }) => this.repository.list(params.genre),
  });

  readonly books = computed<Book[]>(() => (this.resource.hasValue() ? this.resource.value() : []));
  readonly isLoading = this.resource.isLoading;
  readonly error = this.resource.error;

  reload(): void {
    this.resource.reload();
  }

  add(book: NewBook): Observable<Book> {
    return this.repository.add(book).pipe(
      tap(() => {
        this.reload();
        this.genreCounts.reload();
      }),
    );
  }
}
