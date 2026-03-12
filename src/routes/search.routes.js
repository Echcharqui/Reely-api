'use strict';

const { Router } = require('express');
const { searchMovies, searchMulti } = require('../controllers/search.controller');

const router = Router();

router.get('/movies', searchMovies);
router.get('/multi',  searchMulti);

module.exports = router;
