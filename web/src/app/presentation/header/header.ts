import { Component, computed, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { GenreCountsStore } from '../../application/state/genre-counts.store';

@Component({
  imports: [Button, Select],
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  private readonly genreCounts = inject(GenreCountsStore);

  protected readonly options = this.genreCounts.counts;
  protected readonly placeholder = computed(() => `All genres · ${this.genreCounts.total()}`);
}
