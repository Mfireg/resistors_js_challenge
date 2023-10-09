'use strict'

const { ColorMultiplier } = require('../models/color_multiplier.model');
const { Tolerances } = require('../models/tolerance.model');
const { mongoConnection, isTheDatabaseConnected } = require('../services/mongodb.connector');


class Resistors {
  colorValues = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    gray: 8,
    white: 9
  };

  constructor() {
    this.multipliers = {};
    this.tolerances = {};
    this.initializeData();
  }

  async initializeData() {
    try {
      if (isTheDatabaseConnected !== 1) {
        await mongoConnection()
      }

      // Fetch multipliers
      const colorMultipliers = await ColorMultiplier.findOne({});
      if (colorMultipliers) {
        this.multipliers = colorMultipliers.colorMultiplier
      }

      // Fetch tolerances
      const tolerances = await Tolerances.findOne({});
      if (tolerances) {
        this.tolerances = tolerances.tolerances;
      }
    } catch (error) {
      console.error('Error fetching data from the database:', error);
      process.exit(1);
    }
  }

  async ensureDataInitialized() {
    if (Object.keys(this.multipliers).length === 0 || Object.keys(this.tolerances).length === 0) {
      await this.initializeData();
    }
  }

  async validateColorSequence(bandAColor, bandBColor, bandCColor, bandDColor) {
    await this.ensureDataInitialized();

    const isAValidSequence = await
      bandAColor in this.colorValues &&
      bandBColor in this.colorValues &&
      this.multipliers.has(bandCColor) &&
      (bandDColor == "" ||
        bandDColor == null ||
        bandDColor == undefined ||
        bandDColor == "No Color" ||
        this.tolerances.has(bandDColor));

    return isAValidSequence;
  }

  async calculateOhmValue(bandAColor, bandBColor, bandCColor, bandDColor) {
    await this.ensureDataInitialized();

    const significantFigures = ((10 * this.colorValues[bandAColor]) + this.colorValues[bandBColor]);
    const multiplier = this.multipliers.get(bandCColor);
    const tolerance = this.tolerances.has(bandDColor) ? this.tolerances.get(bandDColor) : 20;

    const ohmValue = significantFigures * multiplier;
    return {
      ohmValue: Math.round(ohmValue),
      tolerance: `±${tolerance}`
    }
  }
}

module.exports = {
  Resistors,
};
