using BookStore.Application.Abstractions;
using BookStore.Application.Common;
using BookStore.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Application.Features.Books.GetGenreCounts;

internal sealed class GetGenreCountsHandler(IAppDbContext db)
    : IRequestHandler<GetGenreCountsQuery, IReadOnlyList<GenreCount>>
{
    public async Task<IReadOnlyList<GenreCount>> Handle(GetGenreCountsQuery request, CancellationToken cancellationToken)
    {
        var rows = await db.SqlQuery<GenreCountRow>($"""
            SELECT Genre, COUNT(*) AS Count
            FROM Books
            GROUP BY Genre
            """)
            .ToListAsync(cancellationToken);

        var countsByGenre = rows.ToDictionary(r => r.Genre, r => r.Count);

        return Enum.GetValues<Genre>()
            .Select(genre => new GenreCount(genre, countsByGenre.GetValueOrDefault(genre.ToString())))
            .ToList();
    }

    private sealed class GenreCountRow
    {
        public string Genre { get; init; } = string.Empty;

        public int Count { get; init; }
    }
}
