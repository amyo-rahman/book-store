using System.Text.Json;
using System.Text.Json.Serialization;
using BookStore.Domain;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Infrastructure.Persistence.Seed;

internal static class DbSeeder
{
    private static readonly JsonSerializerOptions _jsonOptions = new(JsonSerializerDefaults.Web)
    {
        Converters = { new JsonStringEnumConverter() },
    };

    public static async Task SeedAsync(BookStoreDbContext db, CancellationToken cancellationToken)
    {
        if (await db.Books.AnyAsync(cancellationToken))
        {
            return;
        }

        await using var stream = typeof(DbSeeder).Assembly.GetManifestResourceStream("BookStore.SeedBooks")
            ?? throw new InvalidOperationException("Embedded seed data 'BookStore.SeedBooks' was not found.");

        var seeds = await JsonSerializer.DeserializeAsync<List<SeedBook>>(stream, _jsonOptions, cancellationToken)
            ?? [];

        db.Books.AddRange(seeds.Select(s => Book.Create(
            s.Title,
            s.Author,
            s.Isbn,
            s.PublishedYear,
            new Uri($"https://covers.openlibrary.org/b/isbn/{s.Isbn}-M.jpg"),
            openLibraryKey: null,
            s.Genre,
            s.Price,
            s.Stock)));

        await db.SaveChangesAsync(cancellationToken);
    }

    private sealed record SeedBook(
        string Title,
        string Author,
        string Isbn,
        int PublishedYear,
        Genre Genre,
        decimal Price,
        int Stock);
}
