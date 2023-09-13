//  This file only dealys with  the endpoints. The functions (or router handlers) that are run in each endpoint (or in a route) when the server receives a request are defined in the launches.controller.js file

const express = require("express");

//  This launchesRouter variable is a router. A router helps us organize our endpoints (or routes).
const launchesRouter = express.Router();
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

//  Note: In the app.js file, the  middleware that hanldes the launches router has the /launches endpoint.

// This is a GET route method. The get() method receives a endpoint(or event) as the first argument and a event handler(or a function) as the second argument
launchesRouter.get("/", httpGetAllLaunches);

// This is a POST route method. The post() method receives a endpoint(or event) as the first argument and a event handler(or a function) as the second argument
launchesRouter.post("/", httpAddNewLaunch);

// This is a DELETE route method. The delete() method receives a endpoint(or event) as the first argument and a event handler(or a function) as the second argument
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
