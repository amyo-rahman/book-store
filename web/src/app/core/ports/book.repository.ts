import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { GenreCount } from '../models/genre-count';

export abstract class BookRepository {
  abstract list(): Observable<Book[]>;
  abstract genreCounts(): Observable<GenreCount[]>;
}
