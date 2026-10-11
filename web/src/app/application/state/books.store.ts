import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Book } from '../../core/models/book';
import { BookRepository } from '../../core/ports/book.repository';

@Injectable({ providedIn: 'root' })
export class BooksStore {
  private readonly repository = inject(BookRepository);
  private readonly resource = rxResource({ stream: () => this.repository.list() });

  readonly books = computed<Book[]>(() => (this.resource.hasValue() ? this.resource.value() : []));
  readonly isLoading = this.resource.isLoading;
  readonly error = this.resource.error;

  reload(): void {
    this.resource.reload();
  }
}
