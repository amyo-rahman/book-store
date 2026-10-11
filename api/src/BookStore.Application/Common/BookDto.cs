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
    DateTimeOffset UpdatedAt);
