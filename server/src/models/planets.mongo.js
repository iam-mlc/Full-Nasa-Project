/*
 Note: The code in the .mongo.js files are not implemented as models (or in the .model.js files) so that the mongoose implementaition is abstracted from the model. This guarantes that if the project enforces the seperation of concerns pattern.If the project changes to a different database, the implementation of the models and controllers will not be affected by the change.
*/ 

const mongoose = require("mongoose");

const types = {
  keplerName: {
    type: String,
    required: true,
  },
};

const planetSchema = new mongoose.Schema(types);

module.exports = mongoose.model("Planet", planetSchema);
