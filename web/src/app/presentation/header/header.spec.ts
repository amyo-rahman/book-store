import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { FakeBookRepository } from '../../../testing/fake-book.repository';
import { FakeCatalogRepository } from '../../../testing/fake-catalog.repository';
import { BookRepository } from '../../core/ports/book.repository';
import { CatalogRepository } from '../../core/ports/catalog.repository';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    const repository = new FakeBookRepository(
      [],
      [
        { genre: 'SciFi', count: 5 },
        { genre: 'Fantasy', count: 1 },
      ],
    );

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        MessageService,
        { provide: BookRepository, useValue: repository },
        { provide: CatalogRepository, useValue: new FakeCatalogRepository() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
  });

  it('should render the Add book button', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('p-button')?.textContent).toContain('Add book');
  });

  it('should show the total number of books in the genre placeholder', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('p-select')?.textContent).toContain('All genres · 6');
  });
});
