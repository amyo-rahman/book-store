import { Observable } from 'rxjs';
import { CatalogItem } from '../models/catalog-item';

export abstract class CatalogRepository {
  abstract search(query: string): Observable<CatalogItem[]>;
}
