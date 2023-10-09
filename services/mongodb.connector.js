const mongoose = require('mongoose');
require('dotenv').config();

process.env.ENVIRONMENT = process.env.ENVIRONMENT || "Development"

let configuration = {
    Development: {
        dbServer: process.env.DEV_DB_SERVER,
        dbPort: process.env.DEV_DB_PORT,
        database: process.env.DEV_DB_DATABASE
    }
}

async function mongoConnection() {
    try {
        const serverUrl = `mongodb://${configuration[process.env.ENVIRONMENT].dbServer}:${configuration[process.env.ENVIRONMENT].dbPort}/${configuration[process.env.ENVIRONMENT].database}`;
        await mongoose.connect(serverUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

async function isTheDatabaseConnected(){
    return mongoose.connection.readyState;
}

module.exports = {
    mongoConnection,
    isTheDatabaseConnected
}