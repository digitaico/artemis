const http = require('http');

const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const {mongoConnect} = require('./services/mongo');
const {loadPlanetsData} = require('./models/planets.model');

const PORT = process.env.API_PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`[Info] : Server UP and running ${PORT}`);
  })
}

startServer();
