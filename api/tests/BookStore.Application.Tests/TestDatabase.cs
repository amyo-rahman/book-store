using BookStore.Infrastructure.Persistence;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Application.Tests;

internal sealed class TestDatabase : IDisposable
{
    private readonly SqliteConnection _connection = new("DataSource=:memory:");

    public TestDatabase()
    {
        _connection.Open();
        Context = CreateContext();
        Context.Database.EnsureCreated();
    }

    public BookStoreDbContext Context { get; }

    public BookStoreDbContext CreateContext() =>
        new(new DbContextOptionsBuilder<BookStoreDbContext>().UseSqlite(_connection).Options, TimeProvider.System);

    public void Dispose()
    {
        Context.Dispose();
        _connection.Dispose();
    }
}
