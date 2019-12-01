const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const JournalSchema = new Schema({
    date: {
        type: String,
        default: moment().format("dddd, MMMM Do YYYY")
    },
    entry: String,
    stressRating: Number, 
    depressionRating: Number, 
    anxietyRating: Number, 
    physicalActivityLevel: String, 
})

module.exports = JournalSchema
