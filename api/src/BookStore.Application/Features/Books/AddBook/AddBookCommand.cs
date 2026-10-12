using System.ComponentModel.DataAnnotations;
using BookStore.Application.Common;
using BookStore.Domain;
using MediatR;

namespace BookStore.Application.Features.Books.AddBook;

public sealed record AddBookCommand(
    [Required, MaxLength(64)] string OpenLibraryKey,
    [Required, MaxLength(300)] string Title,
    [Required, MaxLength(300)] string Author,
    [MaxLength(13)] string? Isbn,
    int? PublishedYear,
    Uri? CoverUrl,
    [Required] Genre? Genre,
    [Range(typeof(decimal), "0.01", "10000", ParseLimitsInInvariantCulture = true, ConvertValueInInvariantCulture = true)]
    decimal Price,
    [Range(0, 100_000)] int Stock,
    [MaxLength(4000)] string? Description) : IRequest<BookDto>;
