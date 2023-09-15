/*
 Note: The code in the .mongo.js files are not implemented as models (or in the .model.js files) so that the mongoose implementaition is abstracted from the model. This guarantes that if the project enforces the seperation of concerns pattern.If the project changes to a different database, the implementation of the models and controllers will not be affected by the change.
*/

const mongoose = require("mongoose");

const types = {
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
};

const launcheSchema = new mongoose.Schema(types);

//  Connects launcheSchema with the "launches" collection. Note that the first argument is written as Launch because mongoose will make it lowercase and plurelize it.
module.exports = mongoose.model("Launch", launcheSchema);
