# Book Store

A small Book Store built as two projects in one repo:

- **`api/`** — REST API on **.NET 10** (ASP.NET Core controllers, EF Core + SQLite, MediatR, Serilog)
- **`web/`** — Angular **22** client (PrimeNG 22 + Tailwind CSS 4, signals, zoneless)

Open Library is the catalog you search to *find* books; the SQLite database is the store you *own*. A user searches Open Library through the API, picks a result, adds the store's own details (genre, price, stock), and the API saves it as a store record. Open Library is never queried again for that book.

## Prerequisites

| Tool | Version |
| --- | --- |
| .NET SDK | 10.0.302 or a later 10.0.x feature band (pinned in `api/global.json`) |
| Node.js | 22.22+, 24.15+ or 26+ (required by Angular 22) |
| npm | 11+ |

No API keys or secrets are needed. Open Library is free and keyless.

## Run it

Start the API first, then the web app, in two terminals.

### API — http://localhost:5080

```bash
cd api
dotnet tool restore        # installs the pinned dotnet-ef tool (only needed for migrations)
dotnet run --project src/BookStore.Api
```

On startup the API applies EF Core migrations and seeds 12 sample books if the table is empty. The database is created at `api/src/BookStore.Api/bookstore.db`. Delete that file (with the API stopped) to start over.

Health check: http://localhost:5080/api/health · OpenAPI document (Development): http://localhost:5080/openapi/v1.json

### Web — http://localhost:4200

```bash
cd web
npm ci
npm start
```

The dev server proxies `/api/*` to `http://localhost:5080` (`web/proxy.conf.json`), so there is no CORS setup.

### PrimeNG license notice

Recent PrimeNG releases (including 22) are distributed under the PrimeUI license and expect a license key. Without one the app works normally but shows a small license notice in the corner. To remove it with your own key (a free Community license is available at https://primeui.dev/pricing):

1. Create `web/src/app/primeui-license.local.ts` (git-ignored) containing `export const PRIMEUI_LICENSE = '<your key>';`
2. Run `npm run start:local` instead of `npm start`.

## Tests

```bash
cd api && dotnet test      # xUnit, against an in-memory SQLite database
cd web && npm test         # Vitest + Angular TestBed
```

## Configuration

| Setting | Where | Default |
| --- | --- | --- |
| Database connection | `ConnectionStrings:BookStore` in `api/src/BookStore.Api/appsettings.json`, or env var `ConnectionStrings__BookStore` | `Data Source=bookstore.db` |
| Log levels | `Serilog:MinimumLevel` in `appsettings.json`; `appsettings.Development.json` also logs EF SQL | Information |
| API port | `api/src/BookStore.Api/Properties/launchSettings.json` | 5080 |
| API base URL (web) | `API_BASE_URL` provider in `web/src/app/app.config.ts` | `/api` |

## API endpoints

| Method & route | Purpose | Touches Open Library? |
| --- | --- | --- |
| `GET /api/catalog/search?q=` | Search Open Library, return normalized results (not saved) | Yes |
| `GET /api/books?genre=` | List store books, optionally filtered by genre | No |
| `GET /api/books/genres` | Book count per genre (all genres, zeros included) | No |
| `POST /api/books` | Save a selected result plus genre, price and stock | No |

Errors use RFC 9457 problem details: `400` validation errors per field, `409` duplicate book (same ISBN or Open Library key), `503` when Open Library is unavailable or times out.

