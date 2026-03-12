'use strict';

const CLIENT_API_KEY = process.env.CLIENT_API_KEY;

if (!CLIENT_API_KEY) {
  throw new Error('CLIENT_API_KEY environment variable is not set. Server cannot start without it.');
}

/**
 * Middleware: require a valid x-api-key header on every request.
 * Register AFTER routes that should be exempt (e.g. /health).
 */
module.exports = function apiKeyAuth(req, res, next) {
  const key = req.headers['x-api-key'];

  if (!key || key !== CLIENT_API_KEY) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'A valid API key is required. Provide it in the x-api-key header.',
    });
  }

  next();
};
