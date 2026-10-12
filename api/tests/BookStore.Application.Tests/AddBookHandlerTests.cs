using BookStore.Application.Common;
using BookStore.Application.Features.Books.AddBook;
using BookStore.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace BookStore.Application.Tests;

public sealed class AddBookHandlerTests : IDisposable
{
    private static readonly AddBookCommand _duneMessiah = new(
        OpenLibraryKey: "/works/OL893461W",
        Title: "Dune Messiah",
        Author: "Frank Herbert",
        Isbn: "9780441172696",
        PublishedYear: 1969,
        CoverUrl: null,
        Genre: Genre.SciFi,
        Price: 15.99m,
        Stock: 4,
        Description: null);

    private readonly TestDatabase _database = new();

    [Fact]
    public async Task SavesANewBook()
    {
        var result = await CreateHandler().Handle(_duneMessiah, TestContext.Current.CancellationToken);

        var saved = await _database.CreateContext().Books.SingleAsync(TestContext.Current.CancellationToken);
        Assert.Equal(result.Id, saved.Id);
        Assert.Equal("Dune Messiah", saved.Title);
        Assert.Equal(15.99m, saved.Price);
        Assert.Equal(Genre.SciFi, saved.Genre);
    }

    [Fact]
    public async Task RejectsABookThatIsAlreadyInTheStore()
    {
        var handler = CreateHandler();
        await handler.Handle(_duneMessiah, TestContext.Current.CancellationToken);

        var sameIsbnDifferentKey = _duneMessiah with { OpenLibraryKey = "/works/OL0000000W" };

        await Assert.ThrowsAsync<DuplicateBookException>(
            () => handler.Handle(sameIsbnDifferentKey, TestContext.Current.CancellationToken));
        Assert.Equal(1, await _database.Context.Books.CountAsync(TestContext.Current.CancellationToken));
    }

    public void Dispose() => _database.Dispose();

    private AddBookHandler CreateHandler() => new(_database.Context, NullLogger<AddBookHandler>.Instance);
}
