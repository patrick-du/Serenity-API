const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JournalSchema = require('./Journal');

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
    assessments: {
        PHQ9: [{
            date: {
                type: String
            },
            score: Number,
            level: String
        }],
        GAD7: [{
            date: {
                type: String
            },
            score: Number,
            level: String
        }]
    }
});


module.exports = User = mongoose.model("users", UserSchema); // compiling schema into a model

