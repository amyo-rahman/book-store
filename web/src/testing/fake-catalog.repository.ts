import { Observable, of } from 'rxjs';
import { CatalogItem } from '../app/core/models/catalog-item';
import { CatalogRepository } from '../app/core/ports/catalog.repository';

export class FakeCatalogRepository extends CatalogRepository {
  constructor(private readonly items: CatalogItem[] = []) {
    super();
  }

  search(query: string): Observable<CatalogItem[]> {
    const q = query.toLowerCase();
    return of(this.items.filter((i) => i.title.toLowerCase().includes(q)));
  }
}
