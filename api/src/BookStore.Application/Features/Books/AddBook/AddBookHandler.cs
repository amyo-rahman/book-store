using BookStore.Application.Abstractions;
using BookStore.Application.Common;
using BookStore.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BookStore.Application.Features.Books.AddBook;

internal sealed class AddBookHandler(IAppDbContext db, ILogger<AddBookHandler> logger)
    : IRequestHandler<AddBookCommand, BookDto>
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
            logger.LogWarning("Rejected duplicate book {OpenLibraryKey} (ISBN {Isbn})", openLibraryKey, isbn);
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

        logger.LogInformation("Added book {BookId} {Title} in {Genre}", book.Id, book.Title, book.Genre);

        return BookDto.FromEntity(book);
    }
}
