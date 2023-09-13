const express = require("express");
const path = require("path");
const app = express();
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const cors = require("cors");
const morgan = require("morgan");
const staticFilesFolder = path.join(__dirname, "..", "public");
const corsOptions = {
  origin: "http://localhost:3000",
};


// NOTE : Keep in mind that the code structure and order is important to make the server work properly. Any part of the comments with a repeated number signifies that the code is part of the same process,


// 1. This middleware recieves the cors method as a argument and verifies if a specific origin is allowed. The Cors receives an options object.
app.use(cors(corsOptions));

// 2. This middleware logs all the requests.
app.use(morgan("combined"))


// 3. This middleware telsl express to parse(or converts) incoming json from the body of incoming requests
app.use(express.json());

// 4. This middleware tells express where it can find the static files
app.use(express.static(staticFilesFolder));

// 5. This middleware tells express that the /planets endpoint should be handled by the planetsRouter
app.use("/planets", planetsRouter);

// 5. This middleware tells express that the /launches endpoint should be handled by the launchesRouter
app.use("/launches", launchesRouter);

// 5. This is a GET route method that serves the index.html file. The "*" charecter that is used in the first argument of the method ("/*") is used  to make the routes specified in a framework (for client side rounting) work in the backend. If the client (or browser for example) made a request to the server while it does not have the mentioned charecter ("*"), the server will respond with a 404 error, even thoght the router in the client side (or the client folder code) specifes the routes.
app.get("/*", (req, res) => {
  const indexFile = path.join(__dirname, "..", "public", "index.html");
  res.sendFile(indexFile);
});

module.exports = app;
