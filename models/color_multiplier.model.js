'use_strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultMultipliers = {
  silver: 0.01,
  gold: 0.1,
  black: 1,
  brown: 10,
  red: 100,
  orange: 1000,
  yellow: 10000,
  green: 100000,
  blue: 1000000,
  violet: 10000000,
  gray: 100000000,
  white: 1000000000
};

const ColorMultiplierSchema = new Schema({
  colorMultiplier: {
    type: Map,
    of: Number,
    default: defaultMultipliers,
  },
});

const ColorMultiplier = mongoose.model('ColorMultiplier', ColorMultiplierSchema);

module.exports = {
  ColorMultiplier,
  defaultMultipliers,
};
