using BookStore.Domain;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Application.Abstractions;

public interface IAppDbContext
{
    DbSet<Book> Books { get; }

    IQueryable<T> SqlQuery<T>(FormattableString sql);

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
