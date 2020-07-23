const mongoose = require("mongoose");

const breedSchema = new mongoose.Schema({
  breedGroup: {
    type: String,
    lowercase: true,
  },
  sid: {
    type: Number,
  },
  lifeSpan: {
    type: String,
  },
  name: {
    type: String,
  },
  temperament: {
    type: String,
  },
  weight: {
    type: String,
  },
  height: String,
  image: String,
  favorite: {
    type: Number,
    default: 0,
  },
});

const Breed = mongoose.model("Breed", breedSchema);
module.exports = Breed;
