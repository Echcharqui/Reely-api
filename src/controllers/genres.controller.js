'use strict';

const tmdb = require('../services/tmdb.service');

const getMovieGenres = async (req, res, next) => {
  try {
    const { language } = req.query;
    const { data } = await tmdb.getMovieGenres({ language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMovieGenres };
