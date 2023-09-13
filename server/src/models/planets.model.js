const path = require("path");
const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

// This function returns a promise because when node js runs, it exports the habitablePlanets variable without updating it with the found data (or the found habitable planets from the csv file). This promise makes sure that the code blocks (node js stops executing other code) until the promise is resolved (or the data is populated). The promise returned from this function has to be resolved before listening to requests in the server. This means that the promise has to be executed before the server starts listening to requests using the server.listen().
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found`);
        resolve();
      });
  });
}

//  This function checks if the planet is habitable based on conditions.
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function getAllPlanets(){
  return habitablePlanets
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};