using BookStore.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookStore.Infrastructure.Persistence.Configurations;

internal sealed class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.ToTable("Books");
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Id).ValueGeneratedNever();

        builder.Property(b => b.Title).HasMaxLength(300).IsRequired();
        builder.Property(b => b.Author).HasMaxLength(300).IsRequired();
        builder.Property(b => b.Isbn).HasMaxLength(13);
        builder.Property(b => b.CoverUrl).HasMaxLength(500);
        builder.Property(b => b.OpenLibraryKey).HasMaxLength(64);
        builder.Property(b => b.Description).HasMaxLength(4000);
        builder.Property(b => b.Genre).HasConversion<string>().HasMaxLength(20);

        builder.Property(b => b.Price)
            .HasColumnName("PriceCents")
            .HasConversion(price => (long)(price * 100), cents => cents / 100m);

        builder.HasIndex(b => b.Isbn).IsUnique().HasFilter("Isbn IS NOT NULL");
        builder.HasIndex(b => b.OpenLibraryKey).IsUnique().HasFilter("OpenLibraryKey IS NOT NULL");
        builder.HasIndex(b => b.Genre);
        builder.HasIndex(b => b.Title);
    }
}
