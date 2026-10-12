using BookStore.Application.Common;
using MediatR;

namespace BookStore.Application.Features.Catalog.SearchCatalog;

public sealed record SearchCatalogQuery(string Query) : IRequest<IReadOnlyList<CatalogItemDto>>;
