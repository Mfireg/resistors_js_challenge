const seed = require('./seed');
require('dotenv').config();

const { mongoConnection } = require('./services/mongodb.connector')

process.on('uncaughtException', (error) => {
  console.log(error);
})

process.on('unhandledRejection', (error, promise) => {
  console.log('Unhandled promise rejection: ', promise);
  console.error('Error: ', error);
});

var app = require('./app');

async function seedDatabase() {
  try {
    await mongoConnection();
    await seed();
  } catch (error) {
    console.error(`Something went wrong: ${error}`)
  }
}

seedDatabase();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Web server running at port: ${process.env.SERVER_PORT}`);
});

