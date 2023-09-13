const mongoose = require("mongoose");

const types = {
  keplerName: {
    type: String,
    required: true,
  },
};

const planetsSchema = new mongoose.Schema(types);
