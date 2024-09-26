const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const psychometricSchema = new Schema({
  focus: {
    type: Number,
    required: true,
    min: 1,
    max: 10, // Example: Assuming scale is from 1 to 10
  },
  challenge: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  balance: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  ambition: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  creativity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  collaboration: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  perseverance: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  distraction: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  preparation: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  curiosity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Psycho = mongoose.model("Psychometric", psychometricSchema);

module.exports = { Psycho };
