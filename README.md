# Reely API

A lightweight Express proxy that sits between the **Reely Angular frontend** and the **TMDB API**. It keeps TMDB credentials off the client, standardises error responses, and exposes a clean, documented REST interface.

---

## Why a proxy?

Calling TMDB directly from a browser app would expose your API key in client-side code. This service solves that by:

- Storing TMDB credentials server-side only
- Injecting authentication on every outbound request transparently
- Returning consistent JSON error shapes regardless of where a failure originates
- Accepting a client-side API key (`x-api-key`) so only authorised frontends can use it

```
Angular frontend
      │
      │  x-api-key header
      ▼
  Reely API  ◄── this service
      │
      │  Bearer token / API key (server-side only)
      ▼
   TMDB API
```

---

## Tech stack

| Layer | Choice |
|---|---|
| Runtime | Node.js (CommonJS) |
| Framework | Express 5 |
| HTTP client | axios |
| Config | dotenv |
| Logging | morgan |
| API docs | swagger-ui-express + js-yaml |
| Dev tooling | nodemon, ESLint |

---

## Project structure

```
reely-api/
├── src/
│   ├── server.js                  # Entry point — loads .env, starts HTTP server
│   ├── app.js                     # Express app — middleware, routes, docs, error handler
│   ├── services/
│   │   └── tmdb.service.js        # Axios instance + all TMDB call functions
│   ├── controllers/
│   │   ├── config.controller.js
│   │   ├── genres.controller.js
│   │   ├── movies.controller.js
│   │   ├── search.controller.js
│   │   └── discover.controller.js
│   ├── routes/
│   │   ├── index.js               # Aggregates all route modules
│   │   ├── config.routes.js
│   │   ├── genres.routes.js
│   │   ├── movies.routes.js
│   │   ├── search.routes.js
│   │   └── discover.routes.js
│   └── middlewares/
│       ├── apiKeyAuth.js          # Client API key guard (x-api-key header)
│       ├── errorHandler.js        # Maps TMDB/axios errors → HTTP status codes
│       └── notFound.js            # 404 fallback
├── openapi.yaml                   # OpenAPI 3.0 spec (served at /openapi.json)
├── .env.example                   # Environment variable template
└── package.json
```

---

## Getting started

### Prerequisites

- Node.js 18+
- A [TMDB account](https://www.themoviedb.org/settings/api) with an API key or v4 Bearer token

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Then fill in the values (see [Environment variables](#environment-variables) below).

### 3. Run the server

```bash
# Development — auto-restarts on file changes
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:3000` (or the port you configured).

---

## Environment variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `TMDB_BEARER_TOKEN` | Yes* | — | TMDB v4 read-access token (recommended) |
| `TMDB_API_KEY` | Yes* | — | TMDB v3 API key — used when Bearer token is not set |
| `CLIENT_API_KEY` | Yes | — | Secret key clients must send in `x-api-key` header |
| `PORT` | No | `3000` | HTTP port the server listens on |
| `TMDB_BASE_URL` | No | `https://api.themoviedb.org/3` | TMDB base URL |
| `CORS_ORIGIN` | No | `*` | Comma-separated allowed origins (e.g. `http://localhost:4200`) |

*At least one TMDB credential is required.

**Generate a strong `CLIENT_API_KEY`:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Authentication

All routes except `GET /health` require a valid API key in the request header:

```
x-api-key: your-client-api-key-here
```

Missing or invalid key returns:

```json
HTTP 401 Unauthorized

{
  "error": "Unauthorized",
  "message": "A valid API key is required. Provide it in the x-api-key header."
}
```

---

## API reference

Interactive documentation is available at **`/docs`** when the server is running.
The raw OpenAPI 3.0 spec is served at **`/openapi.json`**.

### Endpoints overview

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Service liveness check (unprotected) |
| GET | `/config` | TMDB image configuration (base URLs, sizes) |
| GET | `/genres/movies` | Full list of TMDB movie genres |
| GET | `/movies/trending/:timeWindow` | Trending movies (`day` or `week`) |
| GET | `/movies/popular` | Popular movies |
| GET | `/movies/top-rated` | Top-rated movies |
| GET | `/movies/now-playing` | Movies currently in theatres |
| GET | `/movies/upcoming` | Upcoming releases |
| GET | `/movies/:id` | Movie details |
| GET | `/movies/:id/credits` | Cast and crew |
| GET | `/movies/:id/videos` | Trailers and teasers |
| GET | `/movies/:id/images` | Posters and backdrops |
| GET | `/movies/:id/reviews` | User reviews |
| GET | `/movies/:id/recommendations` | Recommended movies |
| GET | `/movies/:id/similar` | Similar movies |
| GET | `/search/movies` | Search movies by title |
| GET | `/search/multi` | Multi-search (movies, TV, people) |
| GET | `/discover/movies` | Filtered movie discovery |

### Common query parameters

| Parameter | Type | Description |
|---|---|---|
| `language` | string | ISO 639-1 tag, e.g. `en-US`, `fr-FR` |
| `page` | integer | Page number (1–500, default `1`) |
| `query` | string | Search term (required for search routes) |
| `sort_by` | string | Sort order for discover, e.g. `popularity.desc` |
| `with_genres` | string | Comma-separated genre IDs for discover, e.g. `28,12` |

All query params are forwarded to TMDB as-is — refer to the [TMDB API docs](https://developer.themoviedb.org/reference/intro/getting-started) for the full parameter reference.

---

## Error responses

All errors follow a consistent shape:

```json
{
  "error": "Description of what went wrong",
  "status_code": 34
}
```

`status_code` is only present for upstream TMDB errors. HTTP status codes map as expected: `400`, `401`, `404`, `422`, `429`, `500`, `503`.

---

## Available scripts

```bash
npm run dev     # Start with auto-reload (nodemon)
npm start       # Start production server
npm run lint    # Run ESLint across src/
```

---

## Author

**Hamza Echcharqui**
