export interface CatalogItem {
  openLibraryKey: string;
  title: string;
  author: string;
  isbn: string | null;
  publishedYear: number | null;
  coverUrl: string | null;
}
