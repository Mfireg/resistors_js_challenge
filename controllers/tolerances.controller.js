'use strict'

const { Tolerances } = require('../models/tolerance.model');
const { mongoConnection, isTheDatabaseConnected } = require('../services/mongodb.connector');

async function index(req, res) {
  if (isTheDatabaseConnected !== 1) {
    await mongoConnection()
  }

  let tolerances = await Tolerances.findOne({});
  tolerances = prepareForComboBox(tolerances.tolerances)

  return res.send(tolerances);
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
