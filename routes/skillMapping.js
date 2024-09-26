const express = require("express");
const router = express.Router();
const { SkillMapping } = require("../schema/skillMapping.schema");

router.post("/add-skill-mapping", async (req, res) => {
    try {
        const { personalityTrait, technicalSkills, softSkills, strengths, areasForDevelopment } = req.body;

        const newSkillMapping = new SkillMapping({
            personalityTrait,
            technicalSkills,
            softSkills,
            strengths,
            areasForDevelopment,
        });

        const savedMapping = await newSkillMapping.save();
        res.status(201).json(savedMapping);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get("/skill-mappings", async (req, res) => {
    try {
        const mappings = await SkillMapping.find();
        res.status(200).json(mappings);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSkillMapping = await SkillMapping.findByIdAndDelete(id);

        if (!deletedSkillMapping) {
            return res.status(404).json({ message: 'Skill mapping entry not found' });
        }

        res.status(200).json({ message: 'Skill mapping entry deleted successfully', deletedSkillMapping });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
