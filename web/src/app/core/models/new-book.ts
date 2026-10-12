import { CatalogItem } from './catalog-item';
import { Genre } from './genre';

export interface NewBook {
  item: CatalogItem;
  genre: Genre;
  price: number;
  stock: number;
  description: string | null;
}
