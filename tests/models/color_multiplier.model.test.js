const mongoose = require('mongoose');
const { ColorMultiplier, defaultMultipliers } = require('../../models/color_multiplier.model');
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


describe('Color Multiplier Model', () => {
    it('should save default multipliers to the database and search for them', async () => {
        await ColorMultiplier.create({ colorMultiplier: defaultMultipliers });
        const savedMultipliers = await ColorMultiplier.findOne();

        expect(savedMultipliers).toBeTruthy();
    });
});