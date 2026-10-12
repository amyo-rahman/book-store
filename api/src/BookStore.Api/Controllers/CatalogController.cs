using BookStore.Application.Common;
using BookStore.Application.Features.Catalog.SearchCatalog;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Api.Controllers;

[ApiController]
[Route("api/catalog")]
public sealed class CatalogController(ISender sender) : ControllerBase
{
    [HttpGet("search")]
    public async Task<ActionResult<IReadOnlyList<CatalogItemDto>>> Search(
        [FromQuery] string q,
        CancellationToken cancellationToken)
    {
        try
        {
            return Ok(await sender.Send(new SearchCatalogQuery(q), cancellationToken));
        }
        catch (Exception ex) when ((ex is HttpRequestException or TaskCanceledException) && !cancellationToken.IsCancellationRequested)
        {
            return Problem(
                statusCode: StatusCodes.Status503ServiceUnavailable,
                title: "Open Library is unavailable. Please try again later.");
        }
    }
}
