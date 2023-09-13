const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// This is where the first item (or launch), from the launch object, is set to the map.
launches.set(launch.flightNumber, launch);

function getAllLauches() {
  //  This converts the launches Map to an Array and then returns it. NOTE: The Launches array cannot be iterated (or looped), but an array can be looped. This is why the launches Map is being converted into an array.
  return Array.from(launches.values());
}
function addNewLaunch(launch) {
  // This varibale is being concatenated (or increased) in order to set the latest flight (or launch) number in a consistent manner.
  latestFlightNumber++;

  //  This sets a new item (launch) to the Map. The key of The Map is based on the flightNumber, making it the first argument of the set(). The value of the mentioned key is based on the custom launches interface(or object).Note: .the customers property is a constant, meaning that it will never change. The values of the customers property will always be ZTM and NASA. The upcoming and success properties are added to the launch interface in this function.
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function existsLauchWithId(launchId) {
  //  See if the launches Map contains the launchId. The launchId should be a key of the map. If the key is not found, the return statement will be undefined
  return launches.has(launchId);
}

// This function is used to set certain properties to fallse.
function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted
}

module.exports = {
  getAllLauches,
  addNewLaunch,
  existsLauchWithId,
  abortLaunchById,
};
