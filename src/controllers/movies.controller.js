'use strict';

const tmdb = require('../services/tmdb.service');

const getTrendingMovies = async (req, res, next) => {
  try {
    const { timeWindow } = req.params;
    const { page } = req.query;
    const { data } = await tmdb.getTrendingMovies(timeWindow, { page });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getPopularMovies = async (req, res, next) => {
  try {
    const { page, language } = req.query;
    const { data } = await tmdb.getPopularMovies({ page, language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getTopRatedMovies = async (req, res, next) => {
  try {
    const { page, language } = req.query;
    const { data } = await tmdb.getTopRatedMovies({ page, language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getNowPlayingMovies = async (req, res, next) => {
  try {
    const { page, language } = req.query;
    const { data } = await tmdb.getNowPlayingMovies({ page, language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getUpcomingMovies = async (req, res, next) => {
  try {
    const { page, language } = req.query;
    const { data } = await tmdb.getUpcomingMovies({ page, language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { language } = req.query;
    const { data } = await tmdb.getMovieDetails(id, { language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getMovieCredits = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { language } = req.query;
    const { data } = await tmdb.getMovieCredits(id, { language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getMovieVideos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { language } = req.query;
    const { data } = await tmdb.getMovieVideos(id, { language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getMovieImages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await tmdb.getMovieImages(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getMovieReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, language } = req.query;
    const { data } = await tmdb.getMovieReviews(id, { page, language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getMovieRecommendations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, language } = req.query;
    const { data } = await tmdb.getMovieRecommendations(id, { page, language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const getSimilarMovies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, language } = req.query;
    const { data } = await tmdb.getSimilarMovies(id, { page, language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
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
};
