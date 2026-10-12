import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { BookFilterStore } from '../../application/state/book-filter.store';
import { GenreCountsStore } from '../../application/state/genre-counts.store';
import { AddBookDialog } from '../books/add-book-dialog/add-book-dialog';

@Component({
  imports: [AddBookDialog, Button, FormsModule, Select],
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  private readonly genreCounts = inject(GenreCountsStore);

  protected readonly filter = inject(BookFilterStore);

  protected readonly showAddBook = signal(false);
  protected readonly options = this.genreCounts.counts;
  protected readonly placeholder = computed(() => `All genres · ${this.genreCounts.total()}`);
}
