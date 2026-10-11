import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BooksStore } from '../../application/state/books.store';

@Component({
  imports: [Button, CurrencyPipe, TableModule],
  selector: 'app-body',
  templateUrl: './body.html',
  host: { class: 'flex-1' },
})
export class Body {
  private readonly store = inject(BooksStore);

  protected readonly books = this.store.books;
  protected readonly isLoading = this.store.isLoading;
  protected readonly error = this.store.error;

  protected reload(): void {
    this.store.reload();
  }
}
