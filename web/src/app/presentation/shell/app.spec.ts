import { TestBed } from '@angular/core/testing';
import { FakeBookRepository } from '../../../testing/fake-book.repository';
import { BookRepository } from '../../core/ports/book.repository';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: BookRepository, useValue: new FakeBookRepository() }],
    }).compileComponents();
  });

  it('should render header, body and footer as siblings', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const host = fixture.nativeElement as HTMLElement;

    const children = Array.from(host.children).map((el) => el.tagName.toLowerCase());
    expect(children).toEqual(['app-header', 'app-body', 'app-footer']);
  });
});
