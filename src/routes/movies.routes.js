'use strict';

const { Router } = require('express');
const {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMovieImages,
  getMovieReviews,
  getMovieRecommendations,
  getSimilarMovies,
} = require('../controllers/movies.controller');

const router = Router();

// Lists — must be registered before /:id to avoid shadowing
router.get('/trending/:timeWindow', getTrendingMovies);
router.get('/popular',             getPopularMovies);
router.get('/top-rated',           getTopRatedMovies);
router.get('/now-playing',         getNowPlayingMovies);
router.get('/upcoming',            getUpcomingMovies);

// Detail sub-resources — specific paths before /:id catch-all
router.get('/:id/credits',         getMovieCredits);
router.get('/:id/videos',          getMovieVideos);
router.get('/:id/images',          getMovieImages);
router.get('/:id/reviews',         getMovieReviews);
router.get('/:id/recommendations', getMovieRecommendations);
router.get('/:id/similar',         getSimilarMovies);

// Movie detail
router.get('/:id',                 getMovieDetails);

module.exports = router;
