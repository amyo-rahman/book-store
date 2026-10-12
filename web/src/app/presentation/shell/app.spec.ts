import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { FakeBookRepository } from '../../../testing/fake-book.repository';
import { FakeCatalogRepository } from '../../../testing/fake-catalog.repository';
import { BookRepository } from '../../core/ports/book.repository';
import { CatalogRepository } from '../../core/ports/catalog.repository';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        MessageService,
        { provide: BookRepository, useValue: new FakeBookRepository() },
        { provide: CatalogRepository, useValue: new FakeCatalogRepository() },
      ],
    }).compileComponents();
  });

  it('should render header, body and footer as siblings', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;

    const children = Array.from(host.children)
      .map((el) => el.tagName.toLowerCase())
      .filter((tag) => tag.startsWith('app-'));
    expect(children).toEqual(['app-header', 'app-body', 'app-footer']);
  });
});
