import { Genre } from './genre';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  publishedYear: number | null;
  coverUrl: string | null;
  openLibraryKey: string | null;
  description: string | null;
  genre: Genre;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
