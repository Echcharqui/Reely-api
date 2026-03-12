'use strict';

const tmdb = require('../services/tmdb.service');

const discoverMovies = async (req, res, next) => {
  try {
    const { sort_by, page, language, with_genres } = req.query;
    const { data } = await tmdb.discoverMovies({
      sort_by: sort_by || 'popularity.desc',
      page,
      language,
      with_genres,
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { discoverMovies };
