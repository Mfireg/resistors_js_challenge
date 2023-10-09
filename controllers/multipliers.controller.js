'use strict'

const { ColorMultiplier } = require('../models/color_multiplier.model');
const { mongoConnection, isTheDatabaseConnected } = require('../services/mongodb.connector');

async function index(req, res) {
  if (isTheDatabaseConnected !== 1) {
    await mongoConnection()
  }

  let colorMultipliers = await ColorMultiplier.findOne({});
  colorMultipliers = prepareForComboBox(colorMultipliers.colorMultiplier)

  return res.send(colorMultipliers);
}

function prepareForComboBox(map) {
  return Array.from(map.entries())
    .filter(([key, value]) => typeof value === 'number')
    .map(([key]) => ({
      value: key,
      label: key.charAt(0).toUpperCase() + key.slice(1)
    }));

}

module.exports = {
  index,
};
