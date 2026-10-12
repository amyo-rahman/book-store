using BookStore.Application.Abstractions;
using BookStore.Application.Common;
using BookStore.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Application.Features.Books.AddBook;

internal sealed class AddBookHandler(IAppDbContext db) : IRequestHandler<AddBookCommand, BookDto>
{
    public async Task<BookDto> Handle(AddBookCommand request, CancellationToken cancellationToken)
    {
        var openLibraryKey = request.OpenLibraryKey.Trim();
        var isbn = string.IsNullOrWhiteSpace(request.Isbn) ? null : request.Isbn.Trim();

        var isDuplicate = await db.Books.AnyAsync(
            b => b.OpenLibraryKey == openLibraryKey || (isbn != null && b.Isbn == isbn),
            cancellationToken);

        if (isDuplicate)
        {
            throw new DuplicateBookException();
        }

        var book = Book.Create(
            request.Title,
            request.Author,
            isbn,
            request.PublishedYear,
            request.CoverUrl,
            openLibraryKey,
            request.Genre ?? throw new ArgumentException("Genre is required.", nameof(request)),
            request.Price,
            request.Stock,
            string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim());

        db.Books.Add(book);
        await db.SaveChangesAsync(cancellationToken);

        return BookDto.FromEntity(book);
    }
}
