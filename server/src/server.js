const http = require('http');

const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model');

const PORT = process.env.API_PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`[Info] : Server UP and running ${PORT}`);
  })
}

startServer();

