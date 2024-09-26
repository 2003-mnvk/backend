const express = require("express");
const router = express.Router();
const { Psycho } = require("../schema/psychometric.schema");
const Joi = require("joi");

// Joi validation schema with range validation
const psychometricSchema = Joi.object({
  focus: Joi.number().min(1).max(10).required(),
  challenge: Joi.number().min(1).max(10).required(),
  balance: Joi.number().min(1).max(10).required(),
  ambition: Joi.number().min(1).max(10).required(),
  creativity: Joi.number().min(1).max(10).required(),
  collaboration: Joi.number().min(1).max(10).required(),
  perseverance: Joi.number().min(1).max(10).required(),
  distraction: Joi.number().min(1).max(10).required(),
  preparation: Joi.number().min(1).max(10).required(),
  curiosity: Joi.number().min(1).max(10).required(),
});

// POST route to create a new psychometric entry
router.post("/create", async (req, res) => {
  try {
    // Validate request body using Joi
    const { error, value } = psychometricSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Destructure the validated values
    const {
      focus,
      challenge,
      balance,
      ambition,
      creativity,
      collaboration,
      perseverance,
      distraction,
      preparation,
      curiosity,
    } = value;

    // Create a new psychometric entry
    const newPsycho = new Psycho({
      focus,
      challenge,
      balance,
      ambition,
      creativity,
      collaboration,
      perseverance,
      distraction,
      preparation,
      curiosity,
    });

    // Save the entry to the database
    const savedPsycho = await newPsycho.save();

    // Send a response with the saved entry
    res.status(201).json(savedPsycho);
  } catch (e) {
    // Handle server errors
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const psychoList = await Psycho.find();
    res.json(psychoList);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { error, value } = psychometricSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedPsycho = await Psycho.findByIdAndUpdate(
      req.params.id,
      {
        $set: value,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPsycho) {
      return res.status(404).json({ message: "Psychometric data not found" });
    }
    res.status(200).json(updatedPsycho);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPsycho = await Psycho.findByIdAndDelete(req.params.id);
    if (!deletedPsycho) {
      return res.status(404).json({ message: "Psychometric data not found" });
    }
    res.status(400).json(deletedPsycho);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

module.exports = router;
