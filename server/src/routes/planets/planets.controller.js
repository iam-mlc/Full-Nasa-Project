const { getAllPlanets } = require("../../models/planets.model");

function httpGetAllPlanets(req, res) {
  //  The return statement is added to prevent multiple responses from being made. This statement only make one response and then ends the function. In this case it only retrns the planets as an array. NOTE: Check how the getAllPlanets() function works to understand why the data is an array
  return res.status(200).json(getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
