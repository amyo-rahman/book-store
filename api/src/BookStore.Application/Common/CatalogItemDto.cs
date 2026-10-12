namespace BookStore.Application.Common;

public sealed record CatalogItemDto(
    string OpenLibraryKey,
    string Title,
    string Author,
    string? Isbn,
    int? PublishedYear,
    Uri? CoverUrl);
