import { TestBed } from '@angular/core/testing';
import { aBook, FakeBookRepository } from '../../../testing/fake-book.repository';
import { BookRepository } from '../../core/ports/book.repository';
import { Body } from './body';

describe('Body', () => {
  async function render(repository: BookRepository): Promise<HTMLElement> {
    await TestBed.configureTestingModule({
      imports: [Body],
      providers: [{ provide: BookRepository, useValue: repository }],
    }).compileComponents();

    const fixture = TestBed.createComponent(Body);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('should list books with the title count', async () => {
    const host = await render(
      new FakeBookRepository([aBook(), aBook({ id: '2', title: 'The Hobbit', genre: 'Fantasy' })]),
    );

    expect(host.querySelectorAll('tbody tr').length).toBe(2);
    expect(host.textContent).toContain('2 titles');
    expect(host.textContent).toContain('The Hobbit');
  });

  it('should flag low and out-of-stock books', async () => {
    const host = await render(
      new FakeBookRepository([aBook({ stock: 2 }), aBook({ id: '2', stock: 0 })]),
    );

    expect(host.textContent).toContain('2 · low');
    expect(host.textContent).toContain('Out of stock');
  });

  it('should show an error with a retry button when loading fails', async () => {
    const failing = new FakeBookRepository();
    failing.list = () => {
      throw new Error('API down');
    };

    const host = await render(failing);

    expect(host.querySelector('[role="alert"]')?.textContent).toContain("Couldn't load books.");
  });
});
