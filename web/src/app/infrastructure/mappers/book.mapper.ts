import { Book } from '../../core/models/book';
import { Genre } from '../../core/models/genre';
import { GenreCount } from '../../core/models/genre-count';
import { BookDto, GenreCountDto } from '../dto/book.dto';

export function toBook(dto: BookDto): Book {
  return {
    ...dto,
    genre: dto.genre as Genre,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
}

export function toGenreCount(dto: GenreCountDto): GenreCount {
  return { genre: dto.genre as Genre, count: dto.count };
}
