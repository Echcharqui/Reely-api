'use strict';

const tmdb = require('../services/tmdb.service');

const getConfiguration = async (req, res, next) => {
  try {
    const { data } = await tmdb.getConfiguration();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getConfiguration };
