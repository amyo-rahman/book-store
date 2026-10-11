using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace BookStore.Infrastructure.Persistence;

internal sealed class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<BookStoreDbContext>
{
    public BookStoreDbContext CreateDbContext(string[] args)
    {
        var options = new DbContextOptionsBuilder<BookStoreDbContext>()
            .UseSqlite("Data Source=bookstore.db")
            .Options;

        return new BookStoreDbContext(options, TimeProvider.System);
    }
}
