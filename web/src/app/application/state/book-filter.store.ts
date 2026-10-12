import { Injectable, signal } from '@angular/core';
import { Genre } from '../../core/models/genre';

@Injectable({ providedIn: 'root' })
export class BookFilterStore {
  readonly genre = signal<Genre | null>(null);

  setGenre(genre: Genre | null): void {
    this.genre.set(genre);
  }
}
