import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { Genre } from '../models/genre';
import { GenreCount } from '../models/genre-count';
import { NewBook } from '../models/new-book';

export abstract class BookRepository {
  abstract list(genre: Genre | null): Observable<Book[]>;
  abstract genreCounts(): Observable<GenreCount[]>;
  abstract add(book: NewBook): Observable<Book>;
}
