using BookStore.Application.Abstractions;
using BookStore.Infrastructure.OpenLibrary;
using BookStore.Infrastructure.Persistence;
using BookStore.Infrastructure.Persistence.Seed;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BookStore.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        services.AddSingleton(TimeProvider.System);
        services.AddDbContext<BookStoreDbContext>(options => options.UseSqlite(connectionString));
        services.AddScoped<IAppDbContext>(sp => sp.GetRequiredService<BookStoreDbContext>());

        services.AddHttpClient<IBookCatalog, OpenLibraryClient>(client =>
        {
            client.BaseAddress = new Uri(OpenLibraryClient.BaseUrl);
            client.Timeout = TimeSpan.FromSeconds(10);
            client.DefaultRequestHeaders.UserAgent.ParseAdd("BookStore/1.0 (assessment project)");
        });

        return services;
    }

    public static async Task InitialiseDatabaseAsync(this IServiceProvider services, CancellationToken cancellationToken = default)
    {
        await using var scope = services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<BookStoreDbContext>();

        await db.Database.MigrateAsync(cancellationToken);
        await DbSeeder.SeedAsync(db, cancellationToken);
    }
}
