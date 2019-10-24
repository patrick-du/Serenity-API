const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    primaryMuscles: [{
        type: String
    }],
    equipmentType: String,
})
module.exports = ExerciseSchema
