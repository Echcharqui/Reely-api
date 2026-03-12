'use strict';

const { Router } = require('express');
const configRoutes   = require('./config.routes');
const genresRoutes   = require('./genres.routes');
const moviesRoutes   = require('./movies.routes');
const searchRoutes   = require('./search.routes');
const discoverRoutes = require('./discover.routes');

const router = Router();

router.use('/config',   configRoutes);
router.use('/genres',   genresRoutes);
router.use('/movies',   moviesRoutes);
router.use('/search',   searchRoutes);
router.use('/discover', discoverRoutes);

module.exports = router;
