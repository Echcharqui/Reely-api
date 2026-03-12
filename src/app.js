'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const apiKeyAuth = require('./middlewares/apiKeyAuth');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
const corsOrigin = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim()) : '*';

app.use(cors({ origin: corsOrigin }));

// ── Request logging ───────────────────────────────────────────────────────────
app.use(morgan('dev'));

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API key authentication (all routes below this point are protected) ────────
app.use(apiKeyAuth);

// ── OpenAPI spec + Swagger UI ─────────────────────────────────────────────────
const specPath = path.join(__dirname, '..', 'openapi.yaml');
const spec = yaml.load(fs.readFileSync(specPath, 'utf8'));

app.get('/openapi.json', (req, res) => res.json(spec));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/', routes);

// ── 404 + centralised error handler (must be last) ───────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
