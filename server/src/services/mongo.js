// This MONGO_URL string is used to connect to the MongoDB database.

/*  Check the link structure in the following link:

https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb

*/
const MONGO_URL =
  "mongodb+srv://nasa-api:SFJA3OOzhvCHXQ2Q@nasacluster.0pithss.mongodb.net/nasa?retryWrites=true&w=majority";

const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function connectMongoDb() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  connectMongoDb,
}
