const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const careerSchema = new Schema({
    career: {
        type: String,
        required: true,
    },
    requiredSkills: [String],
    preferredTraits: [String],
    description: String,
});

const Career = mongoose.model("Career", careerSchema);

module.exports = { Career };
