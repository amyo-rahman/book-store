using BookStore.Application.Abstractions;
using BookStore.Application.Common;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Api.Controllers;

[ApiController]
[Route("api/catalog")]
public sealed class CatalogController(IBookCatalog catalog) : ControllerBase
{
    [HttpGet("search")]
    public async Task<ActionResult<IReadOnlyList<CatalogItemDto>>> Search(
        [FromQuery] string q,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await catalog.SearchAsync(q.Trim(), cancellationToken));
        }
        catch (Exception ex) when ((ex is HttpRequestException or TaskCanceledException) && !cancellationToken.IsCancellationRequested)
        {
            return Problem(
                statusCode: StatusCodes.Status503ServiceUnavailable,
                title: "Open Library is unavailable. Please try again later.");
        }
    }
}
