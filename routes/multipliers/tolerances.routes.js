'use strict'

const express = require('express')
const tolerancesController = require('../../controllers/tolerances.controller')
const router = express.Router();

router.get('/tolerances', tolerancesController.index);

module.exports = router;