'use strict'

const express = require('express')
const multipliersController = require('../../controllers/multipliers.controller')
const router = express.Router();

router.get('/multipliers', multipliersController.index);

module.exports = router;