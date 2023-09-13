const mongoose = require("mongoose");

const types = {
  keplerName: {
    type: String,
    required: true,
  },
};

const planetSchema = new mongoose.Schema(types);

module.exports = mongoose.model("Planet", planetSchema);
