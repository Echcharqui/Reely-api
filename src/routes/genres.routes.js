'use strict';

const { Router } = require('express');
const { getMovieGenres } = require('../controllers/genres.controller');

const router = Router();

router.get('/movies', getMovieGenres);

module.exports = router;
