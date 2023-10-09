'use strict'

const express = require('express')
const challengesController = require('../../controllers/challenges.controller')
const router = express.Router();

router.post('/resistors-info', challengesController.resistorsInfo);

module.exports = router;