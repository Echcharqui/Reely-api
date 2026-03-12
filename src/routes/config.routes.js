'use strict';

const { Router } = require('express');
const { getConfiguration } = require('../controllers/config.controller');

const router = Router();

router.get('/', getConfiguration);

module.exports = router;
