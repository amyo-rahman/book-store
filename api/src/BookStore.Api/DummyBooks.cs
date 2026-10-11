using BookStore.Application.Common;
using BookStore.Domain;

namespace BookStore.Api;

internal static class DummyBooks
{
    private static readonly DateTimeOffset _seededAt = new(2026, 10, 1, 9, 0, 0, TimeSpan.Zero);

    public static IReadOnlyList<BookDto> All { get; } =
    [
        Create("Dune", "Frank Herbert", "9780441172719", 1965, Genre.SciFi, 18.99m, 12),
        Create("The Hobbit", "J.R.R. Tolkien", "9780547928227", 1937, Genre.Fantasy, 14.50m, 8),
        Create("Pride and Prejudice", "Jane Austen", "9780141439518", 1813, Genre.Fiction, 9.99m, 20),
        Create("The Murder of Roger Ackroyd", "Agatha Christie", "9780062073563", 1926, Genre.Mystery, 12.00m, 5),
        Create("Steve Jobs", "Walter Isaacson", "9781451648539", 2011, Genre.Biography, 21.00m, 3),
        Create("Sapiens", "Yuval Noah Harari", "9780062316097", 2011, Genre.NonFiction, 19.95m, 9),
        Create("Charlotte's Web", "E. B. White", "9780064400558", 1952, Genre.Children, 8.99m, 15),
        Create("The Guns of August", "Barbara W. Tuchman", "9780345476098", 1962, Genre.History, 16.75m, 0),
        Create("Neuromancer", "William Gibson", "9780441569595", 1984, Genre.SciFi, 15.00m, 6),
        Create("Foundation", "Isaac Asimov", "9780553293357", 1951, Genre.SciFi, 13.99m, 11),
        Create("The Left Hand of Darkness", "Ursula K. Le Guin", "9780441478125", 1969, Genre.SciFi, 16.00m, 4),
        Create("Hyperion", "Dan Simmons", "9780553283686", 1989, Genre.SciFi, 17.50m, 2),
    ];

    private static BookDto Create(
        string title, string author, string isbn, int year, Genre genre, decimal price, int stock) =>
        new(
            Guid.NewGuid(),
            title,
            author,
            isbn,
            year,
            new Uri($"https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg"),
            OpenLibraryKey: null,
            Description: null,
            genre,
            price,
            stock,
            _seededAt,
            _seededAt);
}
