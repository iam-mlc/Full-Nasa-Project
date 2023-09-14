const express = require("express");
const planetsRouter = require("./planets/planets.router");
const launchesRouter = require("./launches/launches.router");

const api = express.Router();

// 5. This middleware tells express that the /planets endpoint should be handled by the planetsRouter
api.use("/planets", planetsRouter);

// 5. This middleware tells express that the /launches endpoint should be handled by the launchesRouter
api.use("/launches", launchesRouter);

module.exports = api;
