'use_strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultTolerances = {
  brown: 1,
  red: 2,
  green: 0.5,
  blue: 0.25,
  violet: 0.1,
  gray: 0.05,
  gold: 5,
  silver: 10,
  yellow: 20,
  orange: 50
};

const TolerancesSchema = new Schema({
  tolerances: {
    type: Map,
    of: Number,
    default: defaultTolerances,
  },
});

const Tolerances = mongoose.model('Tolerances', TolerancesSchema);

module.exports = {
  Tolerances,
  defaultTolerances,
};
