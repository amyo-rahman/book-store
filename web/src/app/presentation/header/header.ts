import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { GENRES, Genre } from '../../core/models/genre';

@Component({
  imports: [Button, Select],
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  protected readonly genres: Genre[] = [...GENRES];
}
