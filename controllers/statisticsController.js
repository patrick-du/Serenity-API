const User = require("../models/User");
const { userMsg, statsMsg } = require("../constants/responseMsg");

exports.getJournalTrend = (req, res) => {
  const { userId } = req.params;
  const stressArr = [];
  const depressionArr = [];
  const anxietyArr = [];

  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      user.journals.forEach((entry) => {
        stressArr.push(entry.stressRating);
        depressionArr.push(entry.depressionRating);
        anxietyArr.push(entry.anxietyRating);
      });
      res.send({ ...statsMsg.TRUE, stressArr, depressionArr, anxietyArr });
    }
  });
};
