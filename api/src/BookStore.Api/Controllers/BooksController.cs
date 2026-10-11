using BookStore.Application.Abstractions;
using BookStore.Application.Common;
using BookStore.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Api.Controllers;

[ApiController]
[Route("api/books")]
public sealed class BooksController(IAppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<BookDto>>> GetBooks(CancellationToken cancellationToken)
    {
        var books = await db.Books
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

        return Ok(books);
    }

    [HttpGet("genres")]
    public async Task<ActionResult<IReadOnlyList<GenreCount>>> GetGenreCounts(CancellationToken cancellationToken)
    {
        var rows = await db.SqlQuery<GenreCountRow>($"""
            SELECT Genre, COUNT(*) AS Count
            FROM Books
            GROUP BY Genre
            """)
            .ToListAsync(cancellationToken);

        var countsByGenre = rows.ToDictionary(r => r.Genre, r => r.Count);

        var counts = Enum.GetValues<Genre>()
            .Select(genre => new GenreCount(genre, countsByGenre.GetValueOrDefault(genre.ToString())))
            .ToList();

        return Ok(counts);
    }

    private sealed class GenreCountRow
    {
        public string Genre { get; init; } = string.Empty;

        public int Count { get; init; }
    }
}
