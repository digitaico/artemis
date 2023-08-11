const http = require('http');

const app = require('./app');
const server = http.createServer(app);

const PORT = process.env.API_PORT || 8000;

server.listen(PORT, () => {
  console.log(`[Info] : Server UP and running ${PORT}`);
})
