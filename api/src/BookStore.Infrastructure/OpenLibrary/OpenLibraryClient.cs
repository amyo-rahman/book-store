using System.Net.Http.Json;
using System.Text.Json.Serialization;
using BookStore.Application.Abstractions;
using BookStore.Application.Common;

namespace BookStore.Infrastructure.OpenLibrary;

internal sealed class OpenLibraryClient(HttpClient http) : IBookCatalog
{
    public const string BaseUrl = "https://openlibrary.org/";
    private const int ResultLimit = 20;
    private const string Fields = "key,title,author_name,first_publish_year,isbn,cover_i";

    public async Task<IReadOnlyList<CatalogItemDto>> SearchAsync(string query, CancellationToken cancellationToken)
    {
        var url = $"search.json?q={Uri.EscapeDataString(query)}&limit={ResultLimit}&fields={Fields}";
        var response = await http.GetFromJsonAsync<SearchResponse>(url, cancellationToken);

        return response?.Docs
            .Where(d => !string.IsNullOrWhiteSpace(d.Key) && !string.IsNullOrWhiteSpace(d.Title))
            .Select(ToCatalogItem)
            .ToList() ?? [];
    }

    private static CatalogItemDto ToCatalogItem(SearchDoc doc) =>
        new(
            doc.Key!,
            doc.Title!,
            doc.AuthorName is { Count: > 0 } authors ? string.Join(", ", authors) : "Unknown author",
            PickIsbn(doc.Isbn),
            doc.FirstPublishYear,
            doc.CoverId is { } coverId ? new Uri($"https://covers.openlibrary.org/b/id/{coverId}-M.jpg") : null);

    private static string? PickIsbn(IReadOnlyList<string>? isbns) =>
        isbns is { Count: > 0 } ? isbns.FirstOrDefault(i => i.Length == 13) ?? isbns[0] : null;

    private sealed record SearchResponse(
        [property: JsonPropertyName("docs")] IReadOnlyList<SearchDoc> Docs);

    private sealed record SearchDoc(
        [property: JsonPropertyName("key")] string? Key,
        [property: JsonPropertyName("title")] string? Title,
        [property: JsonPropertyName("author_name")] IReadOnlyList<string>? AuthorName,
        [property: JsonPropertyName("first_publish_year")] int? FirstPublishYear,
        [property: JsonPropertyName("isbn")] IReadOnlyList<string>? Isbn,
        [property: JsonPropertyName("cover_i")] long? CoverId);
}
