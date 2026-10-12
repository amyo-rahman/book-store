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
            .Select(b => BookDto.FromEntity(b))
            .ToListAsync(cancellationToken);
}
