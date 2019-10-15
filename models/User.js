const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        info: { name: String, description: String },
        exercises: { name: String, sets: Number, reps: Number}
    }]
});

module.exports = User = mongoose.model("users", UserSchema);

// How the export works with mongoose.model: https://mongoosejs.com/docs/api.html#model_Model