using BookStore.Application.Common;

namespace BookStore.Application.Abstractions;

public interface IBookCatalog
{
    Task<IReadOnlyList<CatalogItemDto>> SearchAsync(string query, CancellationToken cancellationToken);
}
