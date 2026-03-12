'use strict';

const tmdb = require('../services/tmdb.service');

const searchMovies = async (req, res, next) => {
  try {
    const { query, page, language } = req.query;
    const { data } = await tmdb.searchMovies({ query, page, language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const searchMulti = async (req, res, next) => {
  try {
    const { query, page, language } = req.query;
    const { data } = await tmdb.searchMulti({ query, page, language });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { searchMovies, searchMulti };
