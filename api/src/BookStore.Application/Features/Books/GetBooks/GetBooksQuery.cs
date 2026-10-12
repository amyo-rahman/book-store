using BookStore.Application.Common;
using BookStore.Domain;
using MediatR;

namespace BookStore.Application.Features.Books.GetBooks;

public sealed record GetBooksQuery(Genre? Genre) : IRequest<IReadOnlyList<BookDto>>;
