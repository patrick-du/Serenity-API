const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Child Schema
const ExerciseSchema = new Schema({
    name: String,
    sets: Number,
    reps: Number,
});

// Parent Schema
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
    workouts: [{
        name: String,
        description: String,
        exercises: [{ 
            name: String, 
            sets: Number, 
            reps: Number,
        }],
    }],
    
    exercises: [ExerciseSchema]
});


module.exports = User = mongoose.model("users", UserSchema); // compiling schema into a model

