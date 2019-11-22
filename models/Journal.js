const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    entry: String,
    stressRating: Number, 
    depressionRating: Number, 
    anxietyRating: Number, 
})

module.exports = JournalSchema
