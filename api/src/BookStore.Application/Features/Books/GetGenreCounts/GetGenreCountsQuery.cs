using BookStore.Application.Common;
using MediatR;

namespace BookStore.Application.Features.Books.GetGenreCounts;

public sealed record GetGenreCountsQuery : IRequest<IReadOnlyList<GenreCount>>;
