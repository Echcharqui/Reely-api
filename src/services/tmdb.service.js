'use strict';

/**
 * Axios instance pre-configured for TMDB v3.
 * Auth priority: Bearer token (TMDB_BEARER_TOKEN) → API key query param (TMDB_API_KEY).
 * dotenv must be loaded before this module is first required.
 */
const axios = require('axios');

const tmdb = axios.create({
  baseURL: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    ...(process.env.TMDB_BEARER_TOKEN && {
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
    }),
  },
  params: !process.env.TMDB_BEARER_TOKEN && process.env.TMDB_API_KEY
    ? { api_key: process.env.TMDB_API_KEY }
    : {},
});

// ── Support ───────────────────────────────────────────────────────────────────
const getConfiguration = () => tmdb.get('/configuration');
const getMovieGenres = (params) => tmdb.get('/genre/movie/list', { params });

// ── Home / Movie lists ────────────────────────────────────────────────────────
const getTrendingMovies = (timeWindow, params) => tmdb.get(`/trending/movie/${timeWindow}`, { params });
const getPopularMovies    = (params) => tmdb.get('/movie/popular',      { params });
const getTopRatedMovies   = (params) => tmdb.get('/movie/top_rated',    { params });
const getNowPlayingMovies = (params) => tmdb.get('/movie/now_playing',  { params });
const getUpcomingMovies   = (params) => tmdb.get('/movie/upcoming',     { params });

// ── Search ────────────────────────────────────────────────────────────────────
const searchMovies = (params) => tmdb.get('/search/movie', { params });
const searchMulti  = (params) => tmdb.get('/search/multi', { params });

// ── Discover ──────────────────────────────────────────────────────────────────
const discoverMovies = (params) => tmdb.get('/discover/movie', { params });

// ── Movie details ─────────────────────────────────────────────────────────────
const getMovieDetails         = (id, params) => tmdb.get(`/movie/${id}`,                { params });
const getMovieCredits         = (id, params) => tmdb.get(`/movie/${id}/credits`,        { params });
const getMovieVideos          = (id, params) => tmdb.get(`/movie/${id}/videos`,         { params });
const getMovieImages          = (id)         => tmdb.get(`/movie/${id}/images`);
const getMovieReviews         = (id, params) => tmdb.get(`/movie/${id}/reviews`,        { params });
const getMovieRecommendations = (id, params) => tmdb.get(`/movie/${id}/recommendations`,{ params });
const getSimilarMovies        = (id, params) => tmdb.get(`/movie/${id}/similar`,        { params });

module.exports = {
  getConfiguration,
  getMovieGenres,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  searchMovies,
  searchMulti,
  discoverMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMovieImages,
  getMovieReviews,
  getMovieRecommendations,
  getSimilarMovies,
};
