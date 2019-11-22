const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JournalSchema = require('./Journal');
const ExerciseSchema = require('./Exercise');

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    createdOn: { 
        type: Date, 
        default: Date.now
    },
    journals: [JournalSchema],
    exercises: [ExerciseSchema]
});


module.exports = User = mongoose.model("users", UserSchema); // compiling schema into a model

