'use strict';

// Load env vars before any other module so the TMDB service picks them up
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

if (!process.env.TMDB_BEARER_TOKEN && !process.env.TMDB_API_KEY) {
  console.warn(
    'Warning: neither TMDB_BEARER_TOKEN nor TMDB_API_KEY is set — requests to TMDB will fail.'
  );
}

app.listen(PORT, () => {
  console.log(`Reely API  →  http://localhost:${PORT}`);
  console.log(`Swagger UI →  http://localhost:${PORT}/docs`);
  console.log(`OpenAPI    →  http://localhost:${PORT}/openapi.json`);
});
