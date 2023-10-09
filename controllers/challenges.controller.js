'use strict'

const { Resistors } = require('../services/resistor');

async function resistorsInfo(req, res) {
  const calculator = new Resistors();

  const bandAColor = req.body.bandAColor;
  const bandBColor = req.body.bandBColor;
  const bandCColor = req.body.bandCColor;
  const bandDColor = req.body.bandDColor;

  if (! await calculator.validateColorSequence(bandAColor, bandBColor, bandCColor, bandDColor)) {
    return res.status(400).json({
      ohmValue: "Invalid",
      tolerance: `Invalid`
    });
  }

  let ohmValueInfo = await calculator.calculateOhmValue(bandAColor, bandBColor, bandCColor, bandDColor);
  return res.json(ohmValueInfo);
}

module.exports = {
  resistorsInfo,
};
