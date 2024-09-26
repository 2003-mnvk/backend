const express = require("express");
const router = express.Router();
const { Psycho } = require("../schema/psychometric.schema");
const { SkillMapping } = require("../schema/skillMapping.schema");
const { Career } = require("../schema/careerRecommendations.schema");

router.get("/recommendations/:userId", async (req, res) => {
    try {
        // Fetch user's psychometric data and skill mapping
        const psychoData = await Psycho.findById(req.params.userId);
        const skillMapping = await SkillMapping.find();

        if (!psychoData || skillMapping.length === 0) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Extract user's traits and skills
        const userTraits = Object.keys(psychoData.toObject()).filter(
            (key) => psychoData[key] > 5 // Assuming a threshold
        );
        const userSkills = skillMapping.reduce((skills, mapping) => {
            if (userTraits.includes(mapping.personalityTrait)) {
                return skills.concat(mapping.technicalSkills, mapping.softSkills);
            }
            return skills;
        }, []);

        // Fetch career recommendations based on skills and traits
        const careers = await Career.find();
        const recommendations = careers.filter((career) => {
            const skillsMatch = career.requiredSkills.every((skill) =>
                userSkills.includes(skill)
            );
            const traitsMatch = career.preferredTraits.every((trait) =>
                userTraits.includes(trait)
            );
            return skillsMatch && traitsMatch;
        });

        res.status(200).json(recommendations);
    } catch (e) {
        res.status(500).json({ message: "Internal Server Error", error: e.message });
    }
});

module.exports = router;
