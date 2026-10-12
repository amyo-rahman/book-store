using BookStore.Application.Features.Books.GetGenreCounts;
using BookStore.Domain;

namespace BookStore.Application.Tests;

public sealed class GetGenreCountsHandlerTests : IDisposable
{
    private readonly TestDatabase _database = new();

    [Fact]
    public async Task CountsBooksPerGenreIncludingGenresWithNoBooks()
    {
        _database.Context.Books.AddRange(
            Book.Create("Dune", "Frank Herbert", "9780441172719", 1965, null, "/works/1", Genre.SciFi, 18.99m, 12),
            Book.Create("Foundation", "Isaac Asimov", "9780553293357", 1951, null, "/works/2", Genre.SciFi, 13.99m, 11),
            Book.Create("The Hobbit", "J.R.R. Tolkien", "9780547928227", 1937, null, "/works/3", Genre.Fantasy, 14.50m, 8));
        await _database.Context.SaveChangesAsync(TestContext.Current.CancellationToken);

        var counts = await new GetGenreCountsHandler(_database.Context)
            .Handle(new GetGenreCountsQuery(), TestContext.Current.CancellationToken);

        Assert.Equal(Enum.GetValues<Genre>().Length, counts.Count);
        Assert.Equal(2, counts.Single(c => c.Genre == Genre.SciFi).Count);
        Assert.Equal(1, counts.Single(c => c.Genre == Genre.Fantasy).Count);
        Assert.Equal(0, counts.Single(c => c.Genre == Genre.History).Count);
    }

    public void Dispose() => _database.Dispose();
}
