const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PWD = process.env.MONGO_PASSWORD;

const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@ztm-node-nasa-exoplanet.hoo8wnl.mongodb.net/nasa?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
  console.log('... MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
