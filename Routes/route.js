const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

const route = express.Router();

const Places = require("../models/Places");

//Connceting to the database
//
mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✌ connected the the database ✌"));
//
//Connceting to the database

route.use(express.json());

route.get("/", async (req, res) => {
  try {
    const results = await Places.find({});
    res.json(results);
  } catch (error) {
    console.log(error);
  }
});

route.post("/", async (req, res) => {
  console.log(req.body);
  const data = {
    name: req.body.name,
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude),
    description: req.body.description,
  };
  const placeSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string()
      .min(3)
      .max(50),
    latitude: Joi.number()
      .min(1)
      .max(360),
    longitude: Joi.number()
      .min(1)
      .max(360),
    description: Joi.string()
      .min(3)
      .max(50),
  });
  try {
    const value = await placeSchema.validateAsync(data).then(() => {
      const sending = new Places(data);
      sending
        .save()
        .then((result) => console.log(result))
        .catch((err) => console.log("error at ", err));
      res.status(200).send(" done and done ");
    });
  } catch (err) {
    console.log("error validating ", err);
    res.status(500).send(" done and done ");
  }
});

module.exports = route;
