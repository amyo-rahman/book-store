import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { aBook, FakeBookRepository } from '../../../../testing/fake-book.repository';
import { FakeCatalogRepository } from '../../../../testing/fake-catalog.repository';
import { CatalogItem } from '../../../core/models/catalog-item';
import { BookRepository } from '../../../core/ports/book.repository';
import { CatalogRepository } from '../../../core/ports/catalog.repository';
import { AddBookDialog } from './add-book-dialog';

const dune: CatalogItem = {
  openLibraryKey: '/works/OL893415W',
  title: 'Dune',
  author: 'Frank Herbert',
  isbn: '9780441172719',
  publishedYear: 1965,
  coverUrl: null,
};

const duneMessiah: CatalogItem = { ...dune, openLibraryKey: '/works/OL893512W', title: 'Dune Messiah', isbn: '9780441172696' };

describe('AddBookDialog', () => {
  let fixture: ComponentFixture<AddBookDialog>;
  let component: AddBookDialog;
  let messages: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookDialog],
      providers: [
        MessageService,
        { provide: CatalogRepository, useValue: new FakeCatalogRepository([dune, duneMessiah]) },
        { provide: BookRepository, useValue: new FakeBookRepository([aBook({ isbn: dune.isbn })]) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookDialog);
    component = fixture.componentInstance;
    messages = TestBed.inject(MessageService);
    fixture.componentRef.setInput('visible', true);
    await fixture.whenStable();
  });

  it('should search the catalog', async () => {
    component['query'].set('dune');
    component['search']();
    await fixture.whenStable();

    expect(component['results'].value()?.map((i) => i.title)).toEqual(['Dune', 'Dune Messiah']);
  });

  it('should not let a book that is already in the store be selected', () => {
    component['select'](dune);
    expect(component['selected']()).toBeNull();

    component['select'](duneMessiah);
    expect(component['selected']()).toEqual(duneMessiah);
  });

  it('should reject a price of zero', () => {
    const price = component['form'].controls.price;
    price.setValue(0);

    expect(price.hasError('min')).toBe(true);
  });

  it('should show a toast and close on save', () => {
    const add = vi.spyOn(messages, 'add');
    component['select'](duneMessiah);
    component['form'].setValue({ genre: 'SciFi', price: 15.99, stock: 4, description: '' });

    component['save']();

    expect(add).toHaveBeenCalledWith(expect.objectContaining({ detail: expect.stringContaining('Dune Messiah') }));
    expect(component.visible()).toBe(false);
  });
});
