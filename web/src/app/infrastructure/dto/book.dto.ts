export interface BookDto {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  publishedYear: number | null;
  coverUrl: string | null;
  openLibraryKey: string | null;
  description: string | null;
  genre: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface GenreCountDto {
  genre: string;
  count: number;
}

export interface AddBookRequestDto {
  openLibraryKey: string;
  title: string;
  author: string;
  isbn: string | null;
  publishedYear: number | null;
  coverUrl: string | null;
  genre: string;
  price: number;
  stock: number;
  description: string | null;
}
