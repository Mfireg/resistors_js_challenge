const mongoose = require('mongoose');
const { Tolerances, defaultTolerances } = require('../../models/tolerance.model');
require('dotenv').config();

beforeAll(async () => {
    const serverUrl = `mongodb://${process.env.TEST_DB_SERVER}:${process.env.TEST_DB_PORT}/${process.env.TEST_DB_DATABASE}`;

    await mongoose.connect(serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});


describe('Tolerances Model', () => {
  it('should save default tolerances to the database and search for them', async () => {
    await Tolerances.create({ tolerances: defaultTolerances });
    const savedTolerances = await Tolerances.findOne();

    expect(savedTolerances).toBeTruthy();
  });
});