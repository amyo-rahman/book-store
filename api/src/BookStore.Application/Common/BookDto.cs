using BookStore.Domain;

namespace BookStore.Application.Common;

public sealed record BookDto(
    Guid Id,
    string Title,
    string Author,
    string? Isbn,
    int? PublishedYear,
    Uri? CoverUrl,
    string? OpenLibraryKey,
    string? Description,
    Genre Genre,
    decimal Price,
    int Stock,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt)
{
    public static BookDto FromEntity(Book book) =>
        new(
            book.Id,
            book.Title,
            book.Author,
            book.Isbn,
            book.PublishedYear,
            book.CoverUrl,
            book.OpenLibraryKey,
            book.Description,
            book.Genre,
            book.Price,
            book.Stock,
            book.CreatedAt,
            book.UpdatedAt);
}
