const PORT = process.env.PORT || 8000;

// This MONGO_URL string is used to connect to the MongoDB database.

/*  Check the link structure in the following link:

https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb

*/
const MONGO_URL = "mongodb+srv://nasa-api:SFJA3OOzhvCHXQ2Q@nasacluster.0pithss.mongodb.net/nasa?retryWrites=true&w=majority";
const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);


mongoose.connection.once("open", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function connectDatabase(){

  await mongoose.connect(MONGO_URL);

  
}

async function startServer() {

  await connectDatabase()

  // The loadPlanetsData() function is added before the server.listen() because it returns a promise that has to be resolved before the server starts listening to requests. The promise is related to the habitable planets(or a data from a database) and since the planets data is part of a csv file, we need to parse(oe convert) it. Before parsing it we create a readable stream, which in turn is an asynchronous task. Every chunck (or piece) of data that is parsed and filtered, should be pushed into an array.The promise returned from this function is making sure that we only listen and respond to requests after the array is populated with data, or has set all the data in the array. If this was not done the habitable planets would always return an empty array (the assigned value of habitablePlanets, check the planets.model file). This function makes sure that the results are pushed to the array before listening to more requests
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
