import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../../core/models/book';
import { GenreCount } from '../../core/models/genre-count';
import { BookRepository } from '../../core/ports/book.repository';
import { BookDto, GenreCountDto } from '../dto/book.dto';
import { toBook, toGenreCount } from '../mappers/book.mapper';
import { API_BASE_URL } from './api-base-url';

@Injectable()
export class HttpBookRepository extends BookRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  list(): Observable<Book[]> {
    return this.http
      .get<BookDto[]>(`${this.baseUrl}/books`)
      .pipe(map((dtos) => dtos.map(toBook)));
  }

  genreCounts(): Observable<GenreCount[]> {
    return this.http
      .get<GenreCountDto[]>(`${this.baseUrl}/books/genres`)
      .pipe(map((dtos) => dtos.map(toGenreCount)));
  }
}
