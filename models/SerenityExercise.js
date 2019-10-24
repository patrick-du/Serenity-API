const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SerenityExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    primaryMuscles: [{
        type: String
    }],
    equipmentType: String,
})

module.exports = SerenityExercise = mongoose.model("serenityExercises", SerenityExerciseSchema)
