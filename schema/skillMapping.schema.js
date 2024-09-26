const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillMappingSchema = new Schema({
    personalityTrait: {
        type: String,
        required: true,
    },
    technicalSkills: [String],  
    softSkills: [String],        
    strengths: String,
    areasForDevelopment: String,
});

const SkillMapping = mongoose.model("SkillMapping", skillMappingSchema);

module.exports = { SkillMapping };
