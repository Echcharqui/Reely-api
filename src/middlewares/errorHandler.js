'use strict';

/**
 * Centralised error handler.
 * Handles axios/TMDB upstream errors and generic app errors.
 * Must be registered AFTER all routes in app.js.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Upstream responded with an error status (4xx / 5xx from TMDB)
  if (err.response) {
    const { status, data } = err.response;
    return res.status(status).json({
      error: data.status_message || 'Upstream API error',
      ...(data.status_code && { status_code: data.status_code }),
    });
  }

  // Request was sent but no response received (network / timeout)
  if (err.request) {
    return res.status(503).json({ error: 'Upstream service unavailable' });
  }

  // Application-level error
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
};

module.exports = errorHandler;
