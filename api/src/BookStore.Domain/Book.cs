namespace BookStore.Domain;

public sealed class Book
{
    private Book()
    {
    }

    public Guid Id { get; private set; }

    public string Title { get; private set; } = null!;

    public string Author { get; private set; } = null!;

    public string? Isbn { get; private set; }

    public int? PublishedYear { get; private set; }

    public Uri? CoverUrl { get; private set; }

    public string? OpenLibraryKey { get; private set; }

    public string? Description { get; private set; }

    public Genre Genre { get; private set; }

    public decimal Price { get; private set; }

    public int Stock { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public DateTimeOffset UpdatedAt { get; private set; }

    public static Book Create(
        string title,
        string author,
        string? isbn,
        int? publishedYear,
        Uri? coverUrl,
        string? openLibraryKey,
        Genre genre,
        decimal price,
        int stock,
        string? description = null)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentException.ThrowIfNullOrWhiteSpace(author);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(price);
        ArgumentOutOfRangeException.ThrowIfNegative(stock);

        return new Book
        {
            Id = Guid.CreateVersion7(),
            Title = title.Trim(),
            Author = author.Trim(),
            Isbn = isbn,
            PublishedYear = publishedYear,
            CoverUrl = coverUrl,
            OpenLibraryKey = openLibraryKey,
            Description = description,
            Genre = genre,
            Price = price,
            Stock = stock,
        };
    }
}
