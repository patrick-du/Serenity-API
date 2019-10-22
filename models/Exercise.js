const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    equipmentType: String,
    createdBy: {
        type: String,
        required: true
    }
})

module.exports = Exercise = mongoose.model("exercises", ExerciseSchema);