export class DuplicateBookError extends Error {
  constructor() {
    super('This book is already in the store.');
    this.name = 'DuplicateBookError';
  }
}
