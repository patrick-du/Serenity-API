const User = require("../models/User");
const { Journal } = require("../models/Journal");
const { convertDateToMoment } = require("../utils/date");
const { userMsg, journalMsg } = require("../constants/responseMsg");

exports.getUserJournals = (req, res) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      res.json(user.journals);
    }
  });
};

exports.createUserJournal = (req, res) => {
  const { userId } = req.params;
  const {
    date,
    entry,
    stressRating,
    depressionRating,
    anxietyRating,
    physicalActivityLevel,
  } = req.body;

  const newJournal = new Journal({
    date: convertDateToMoment(date),
    entry,
    stressRating,
    depressionRating,
    anxietyRating,
    physicalActivityLevel,
  });

  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      user.journals.push(newJournal);
      user
        .save()
        .then(res.json(journalMsg.CREATED_JOURNAL))
        .catch((err) =>
          res.status(500).json({ ...journalMsg.FALSE, msg: err })
        );
    }
  });
};

exports.deleteUserJournal = (req, res) => {
  const { userId, journalId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      const journal = user.journals.id(journalId);
      if (!journal) {
        res.status(404).json(journalMsg.JOURNAL_NOT_FOUND);
      } else {
        journal.remove();
        user
          .save()
          .then(res.json(journalMsg.DELETED_JOURNAL))
          .catch((err) =>
            res.status(500).json({ ...journalMsg.FALSE, msg: err })
          );
      }
    }
  });
};
