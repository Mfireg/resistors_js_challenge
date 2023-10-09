'use strict'

const { ColorMultiplier, defaultMultipliers } = require('./models/color_multiplier.model');
const { Tolerances, defaultTolerances } = require('./models/tolerance.model');

// function created for insert default valuies to the collections.
//TODO => Make this seed callable via npm run seed.
const seedDatabase = async () => {
  // Multipliers upsert
  try {
    const result = await ColorMultiplier.findOneAndUpdate(
      {},
      { colorMultiplier: defaultMultipliers },
      { upsert: true, new: true }
    );

    console.log('Default color multipliers inserted:', result);
  } catch (err) {
    console.error('Error inserting default color multipliers:', err);
  }

  // Tolerances upsert
  try {
    const result = await Tolerances.findOneAndUpdate(
      {},
      { tolerances: defaultTolerances },
      { upsert: true, new: true }
    );

    console.log('Default tolerances inserted:', result);
  } catch (err) {
    console.error('Error inserting default tolerances:', err);
  }
};


module.exports = seedDatabase;
