import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogItem } from '../../core/models/catalog-item';
import { CatalogRepository } from '../../core/ports/catalog.repository';
import { CatalogItemDto } from '../dto/catalog.dto';
import { API_BASE_URL } from './api-base-url';

@Injectable()
export class HttpCatalogRepository extends CatalogRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  search(query: string): Observable<CatalogItem[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<CatalogItemDto[]>(`${this.baseUrl}/catalog/search`, { params });
  }
}
