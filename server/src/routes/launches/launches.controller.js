const {
  getAllLauches,
  scheduleNewLaunch,
  existsLauchWithId,
  abortLaunchById,
} = require("../../models/launches.model.js");
const { getPagination } = require("../../services/query.js");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLauches(skip, limit)
  //  The return statement is added to prevent multiple responses from being made. This statement only makes one response and then ends the function. In this case it only returns the launches as an array. NOTE: Check how the getAllLaunches() function works to understand why the data is an array
  return res.status(200).json(launches);
}
async function httpAddNewLaunch(req, res) {
  // This varible accesess the request interface (or object), so it can get the contents of the body property. In this project the body property will ususally contain a json file when posting requests.
  const launch = req.body;

  //  If the request body does not have any of the propertie specified bellow, the server responds with a 400 error status and a json the specifies the error.
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  // This sets one of the properties of the request body (which should be based on the custom launch interface or object that was created for the project) to an expected date. The lauch interface contains a launchDate property as one of its properties.

  launch.launchDate = new Date(launch.launchDate);

  //  If the lauchDate is not a valid date, the server responds with a 400 error status and a json the specifies the error.
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Ïnvalid launch date",
    });
  }
  //  This saves the posted launch to the database
  await scheduleNewLaunch(launch);

  //  If the request was successful, return a 201 status code and a json with the new launch
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  // This variable access the request interface and then it goes to the params property and then the id. The id was created by express when we specified the endpoint "/launshes/:id" in the launches.router.js file.
  const launchId = Number(req.params.id);
  const launchIsPresent = await existsLauchWithId(launchId);

  //  This condition checks if the launchId exists. Since the lanch model (or the lauches stored data) is a Map, we only need the id number in order to delete it. If the condition is true the server responds with a 400 error status and a json the specifies the error.
  if (!launchIsPresent) {
    return res.status(400).json({
      error: "Launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  // If the request was successful, return a 200 status code and a json with the aborted launch
  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
