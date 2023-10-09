const mongoose = require('mongoose');
const { mongoConnection, isTheDatabaseConnected } = require('../../services/mongodb.connector');
require('dotenv').config();

describe('Mongo Service', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    const serverUrl = `mongodb://${process.env.DEV_DB_SERVER}:${process.env.DEV_DB_PORT}/${process.env.DEV_DB_DATABASE}`;

    await mongoose.connect(serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should connect to MongoDB', async () => {
    await expect(mongoConnection()).resolves.toBeUndefined();
  });

  it('should check if the database is connected', async () => {
    const connectionState = await isTheDatabaseConnected();
    expect(connectionState).toBe(1);
  });
});
