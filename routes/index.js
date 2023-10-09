'use strict'

const express = require('express')
const router = express.Router();

router.use('/challenge', require('./challenges/javascript_challenge.routes'));
router.use('/retrieve', require('./multipliers/multiplier.routes'))
router.use('/retrieve', require('./multipliers/tolerances.routes'))


module.exports = router;