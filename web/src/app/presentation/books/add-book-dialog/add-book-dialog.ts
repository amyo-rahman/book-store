import { Component, computed, inject, model, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { BooksStore } from '../../../application/state/books.store';
import { CatalogItem } from '../../../core/models/catalog-item';
import { Genre, GENRES } from '../../../core/models/genre';
import { CatalogRepository } from '../../../core/ports/catalog.repository';

@Component({
  imports: [
    Button,
    Dialog,
    IconField,
    InputIcon,
    InputNumber,
    InputText,
    ReactiveFormsModule,
    Select,
    Textarea,
  ],
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.html',
})
export class AddBookDialog {
  private readonly catalog = inject(CatalogRepository);
  private readonly books = inject(BooksStore);
  private readonly messages = inject(MessageService);

  readonly visible = model(false);

  protected readonly query = signal('');
  protected readonly selected = signal<CatalogItem | null>(null);
  private readonly submittedQuery = signal('');

  protected readonly results = rxResource({
    params: () => this.submittedQuery() || undefined,
    stream: ({ params }) => this.catalog.search(params),
  });

  protected readonly genres: Genre[] = [...GENRES];
  protected readonly form = new FormGroup({
    genre: new FormControl<Genre | null>(null, { validators: [Validators.required] }),
    price: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    stock: new FormControl<number | null>(0, { validators: [Validators.required, Validators.min(0)] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(4000)] }),
  });

  private readonly formStatus = toSignal(this.form.statusChanges, { initialValue: this.form.status });
  protected readonly canSave = computed(() => this.formStatus() === 'VALID');

  private readonly isbnsInStore = computed(
    () => new Set(this.books.books().flatMap((b) => (b.isbn ? [b.isbn] : []))),
  );

  protected isInStore(item: CatalogItem): boolean {
    return item.isbn !== null && this.isbnsInStore().has(item.isbn);
  }

  protected onQueryInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected search(): void {
    this.submittedQuery.set(this.query().trim());
  }

  protected select(item: CatalogItem): void {
    if (!this.isInStore(item)) {
      this.selected.set(item);
    }
  }

  protected changeBook(): void {
    this.selected.set(null);
  }

  protected hasError(name: keyof typeof this.form.controls, error: string): boolean {
    const control = this.form.controls[name];
    return control.touched && control.hasError(error);
  }

  protected save(): void {
    const book = this.selected();
    if (!book || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.messages.add({
      severity: 'success',
      summary: 'Ready to add',
      detail: `"${book.title}" ready to add. Saving comes with the API.`,
    });
    this.visible.set(false);
  }

  protected reset(): void {
    this.query.set('');
    this.submittedQuery.set('');
    this.selected.set(null);
    this.form.reset({ genre: null, price: null, stock: 0, description: '' });
  }
}
