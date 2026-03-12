'use strict';

const { Router } = require('express');
const { discoverMovies } = require('../controllers/discover.controller');

const router = Router();

router.get('/movies', discoverMovies);

module.exports = router;
