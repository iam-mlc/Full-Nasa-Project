require("dotenv").config();

const PORT = process.env.PORT || 8000;

const http = require("http");
const app = require("./app");
const { connectMongoDb } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");

const server = http.createServer(app);

async function startServer() {
  await connectMongoDb();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
