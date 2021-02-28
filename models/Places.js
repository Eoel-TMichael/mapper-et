const mongoose = require("mongoose");
const joi = require("joi");

const Places = new mongoose.Schema({
  name: { type: String, required: true },
  longitude: { type: Number, required: true, min: -180, max: 180 },
  latitude: { type: Number, required: true, min: -90, max: 90 },
  description: { type: String, required: false },
  createdDate: { type: Date, default: Date.now, required: true },
});

//creating the model
const PlaceMod = mongoose.model("Places", Places);

module.exports = PlaceMod;
