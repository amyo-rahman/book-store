import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Book } from '../../core/models/book';
import { DuplicateBookError } from '../../core/models/errors';
import { GenreCount } from '../../core/models/genre-count';
import { NewBook } from '../../core/models/new-book';
import { BookRepository } from '../../core/ports/book.repository';
import { AddBookRequestDto, BookDto, GenreCountDto } from '../dto/book.dto';
import { toAddBookRequest, toBook, toGenreCount } from '../mappers/book.mapper';
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

  add(book: NewBook): Observable<Book> {
    const body: AddBookRequestDto = toAddBookRequest(book);
    return this.http.post<BookDto>(`${this.baseUrl}/books`, body).pipe(
      map(toBook),
      catchError((error: unknown) =>
        throwError(() =>
          error instanceof HttpErrorResponse && error.status === HttpStatusCode.Conflict
            ? new DuplicateBookError()
            : error,
        ),
      ),
    );
  }
}
