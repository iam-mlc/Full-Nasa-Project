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
    required: true,
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
module.exports = mongoose.model("Launch", launcheSchema)