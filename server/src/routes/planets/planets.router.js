//  This file only dealys with  the endpoints. The functions (or router handlers) that are run in each endpoint (or in a route) when the server receives a request are defined in the planets.controller.js file

const express = require("express");
const { httpGetAllPlanets } = require("./planets.controller");

//  Note: In the app.js file, the  middleware that hanldes the planets router has the /planets endpoint.

//  This planetsRouter variable is a router. A router helps us organize our endpoints (or routes).
const planetsRouter = express.Router();

// This is a GET route methods. The get() method receives a endpoint(or event) as the first argument and a handler(or a function) as the second argument
planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
