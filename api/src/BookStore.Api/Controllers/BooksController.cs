using BookStore.Application.Common;
using BookStore.Domain;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Api.Controllers;

[ApiController]
[Route("api/books")]
public sealed class BooksController : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<BookDto>> GetBooks() => Ok(DummyBooks.All);

    [HttpGet("genres")]
    public ActionResult<IReadOnlyList<GenreCount>> GetGenreCounts()
    {
        var counts = Enum.GetValues<Genre>()
            .Select(genre => new GenreCount(genre, DummyBooks.All.Count(b => b.Genre == genre)))
            .ToList();

        return Ok(counts);
    }
}
