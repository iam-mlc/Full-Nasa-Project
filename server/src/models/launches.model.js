const launchesDatabase = require("./launches.mongo");
const planetsDatabase = require("./planets.mongo");
const axios = require("axios");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

const launch = {
  flightNumber: 100, //flight_number
  mission: "Kepler Exploration X", //name
  rocket: "Explorer IS1", // rocket.name
  launchDate: new Date("December 27, 2030"), // date_local
  target: "Kepler-442 b", // not applicable
  customers: ["ZTM", "NASA"], // payload.customers for each payload
  upcoming: true, // upcoming
  success: true, // success
};

saveLaunch(launch);

async function getAllLauches() {
  //  This converts the launches Map to an Array and then returns it. NOTE: The Launches array cannot be iterated (or looped), but an array can be looped. This is why the launches Map is being converted into an array.
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

//  This function adds a new launch to the database related to launches. It first checks if the target planet exists in the planets database. If it does not exist, it returns an error. Otherwise it saves the launch to the database. When saving the lauch to the database the updateOne method is used, so that mongoose verifies if the data already exists (to avoid creating duplicates) based on the luanch flight number. If it already exists, the existing launch will be updated. Incase there was an error saving the launch, an error will be returned
async function saveLaunch(launch) {
  const planetExists = await findPlanet(launch.target);

  try {
    if (!planetExists) {
      throw new Error("No matching planet found");
    }

    await launchesDatabase.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log("Could not save launch");
    console.log(err);
  }
}

// This function adds a new launch to the database related to launches
async function scheduleNewLaunch(launch) {
  //  Since mongo db does not share the flight number with other clusters it will not make since to increment the flight number as a variable that is a part of the server. So we need to get the latest flight number that is stored in the database. By default we set the first flight number to the DEFAULT_FLIGHT_NUMBER variable and increment everytime a new launch is scheduled.
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const internalProperties = {
    upcoming: true,
    success: true,
    customers: ["ZTM", "NASA"],
    flightNumber: newFlightNumber,
  };

  const newLaunch = Object.assign(launch, internalProperties);

  await saveLaunch(newLaunch);
}

async function existsLauchWithId(launchId) {
  //  See if the launches Map contains the launchId. The launchId should be a key of the map. If the key is not found, the return statement will be undefined
  return await launchesDatabase.findOne({ flightNumber: launchId });
}

// This function is used to set certain properties to false.
async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}

// This function is used to find a planet in the planets database by its name
async function findPlanet(planetName) {
  return await planetsDatabase.findOne({ keplerName: planetName });
}

//  This function is used to get the latest flight number of the launches in the database. It first sorts the launches by flight number, in descending order and then returns the last flight number. If the flight number does not exist, it returns the DEFAULT_FLIGHT_NUMBER;
async function getLatestFlightNumber() {
  //  Sorts the launches by flight number in descending order. Note that the string argument of the sort() method is the property to be sorted. The "-" (sign) in front of the flighNumber string is specifying to mangoose that the flight number should be sorted in descending order.
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function loadLaunchesData() {
  console.log("Downloading launch data...");
  const rocketNames = {
    path: "rocket",
    select: {
      name: 1,
    },
  };
  const payloadCustomers = {
    path: "payload",
    select: {
      customers: 1,
    },
  };
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      populate: [rocketNames, payloadCustomers],
    },
  });
}

module.exports = {
  loadLaunchesData,
  getAllLauches,
  existsLauchWithId,
  abortLaunchById,
  scheduleNewLaunch,
};
