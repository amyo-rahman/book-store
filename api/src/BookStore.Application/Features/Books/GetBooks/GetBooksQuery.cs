using BookStore.Application.Common;
using MediatR;

namespace BookStore.Application.Features.Books.GetBooks;

public sealed record GetBooksQuery : IRequest<IReadOnlyList<BookDto>>;
