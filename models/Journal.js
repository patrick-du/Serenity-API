const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  date: {
    type: String,
  },
  entry: String,
  stressRating: Number,
  depressionRating: Number,
  anxietyRating: Number,
  physicalActivityLevel: String,
});

const Journal = mongoose.model("Journal", JournalSchema);

module.exports = { JournalSchema, Journal };
