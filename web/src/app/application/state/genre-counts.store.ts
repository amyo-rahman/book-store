import { computed, inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { GenreCount } from '../../core/models/genre-count';
import { BookRepository } from '../../core/ports/book.repository';

@Injectable({ providedIn: 'root' })
export class GenreCountsStore {
  private readonly repository = inject(BookRepository);
  private readonly resource = rxResource({ stream: () => this.repository.genreCounts() });

  readonly counts = computed<GenreCount[]>(() =>
    this.resource.hasValue() ? this.resource.value() : [],
  );
  readonly total = computed(() => this.counts().reduce((sum, c) => sum + c.count, 0));
  readonly isLoading = this.resource.isLoading;
  readonly error = this.resource.error;

  reload(): void {
    this.resource.reload();
  }
}
