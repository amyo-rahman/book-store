using BookStore.Application.Common;
using BookStore.Application.Features.Books.GetBooks;
using BookStore.Application.Features.Books.GetGenreCounts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Api.Controllers;

[ApiController]
[Route("api/books")]
public sealed class BooksController(ISender sender) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<BookDto>>> GetBooks(CancellationToken cancellationToken) =>
        Ok(await sender.Send(new GetBooksQuery(), cancellationToken));

    [HttpGet("genres")]
    public async Task<ActionResult<IReadOnlyList<GenreCount>>> GetGenreCounts(CancellationToken cancellationToken) =>
        Ok(await sender.Send(new GetGenreCountsQuery(), cancellationToken));
}
