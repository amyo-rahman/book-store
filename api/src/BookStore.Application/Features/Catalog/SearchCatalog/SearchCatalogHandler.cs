using BookStore.Application.Abstractions;
using BookStore.Application.Common;
using MediatR;

namespace BookStore.Application.Features.Catalog.SearchCatalog;

internal sealed class SearchCatalogHandler(IBookCatalog catalog)
    : IRequestHandler<SearchCatalogQuery, IReadOnlyList<CatalogItemDto>>
{
    public Task<IReadOnlyList<CatalogItemDto>> Handle(SearchCatalogQuery request, CancellationToken cancellationToken) =>
        catalog.SearchAsync(request.Query.Trim(), cancellationToken);
}
