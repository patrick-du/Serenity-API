const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { JournalSchema } = require("./Journal");
const { AssessmentSchema } = require("./Assessment");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  journals: [JournalSchema],
  assessments: {
    PHQ9: [AssessmentSchema],
    GAD7: [AssessmentSchema],
  },
});

module.exports = User = mongoose.model("User", UserSchema);
