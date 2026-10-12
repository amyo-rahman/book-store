using BookStore.Application.Abstractions;
using BookStore.Application.Common;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Application.Features.Books.GetBooks;

internal sealed class GetBooksHandler(IAppDbContext db) : IRequestHandler<GetBooksQuery, IReadOnlyList<BookDto>>
{
    public async Task<IReadOnlyList<BookDto>> Handle(GetBooksQuery request, CancellationToken cancellationToken) =>
        await db.Books
            .AsNoTracking()
            .OrderBy(b => b.Title)
            .Select(b => new BookDto(
                b.Id,
                b.Title,
                b.Author,
                b.Isbn,
                b.PublishedYear,
                b.CoverUrl,
                b.OpenLibraryKey,
                b.Description,
                b.Genre,
                b.Price,
                b.Stock,
                b.CreatedAt,
                b.UpdatedAt))
            .ToListAsync(cancellationToken);
}
