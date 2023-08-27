const http = require('http');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const MONGO_USER = process.env.MONGO_USER;

const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model');

const PORT = process.env.API_PORT || 8000;

const MONGO_URL = `mongodb+srv://user:${MONGO_USER}@ztm-node-nasa-exoplanet.hoo8wnl.mongodb.net/nasa?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('... MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`[Info] : Server UP and running ${PORT}`);
  })
}

startServer();
