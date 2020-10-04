const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema({
  date: {
    type: String,
  },
  score: Number,
  level: String,
});

const Assessment = mongoose.model("Assessment", AssessmentSchema);

module.exports = { AssessmentSchema, Assessment };
