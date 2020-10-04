const User = require("../models/User");
const { Journal } = require("../models/Journal");
const { convertDateToMoment } = require("../utils/date");
const { userErr, journalErr } = require("../constants/errors");

exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) res.status(404).json(userErr.NO_USERS);
    res.json(users);
  });
};

exports.getSpecificUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) res.status(404).json(userErr.USER_NOT_FOUND);
    res.json(user);
  });
};

exports.getUserJournals = (req, res) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) res.status(404).json(userErr.USER_NOT_FOUND);
    res.json(user.journals);
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
    if (err) res.status(404).json(userErr.USER_NOT_FOUND);
    user.journals.push(newJournal);
    user
      .save()
      .then(res.json(journalErr.CREATED_JOURNAL))
      .catch((err) => res.status(500).json({ ...journalErr.FALSE, msg: err }));
  });
};

exports.deleteUserJournal = (req, res) => {
  const { userId, journalId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) res.status(404).json(userErr.USER_NOT_FOUND);
    const journal = user.journals.id(journalId);
    if (!journal) {
      res.status(404).json(journalErr.JOURNAL_NOT_FOUND);
    }
    journal.remove();
    user
      .save()
      .then(res.json(journalErr.DELETED_JOURNAL))
      .catch((err) => res.status(500).json({ ...journalErr.FALSE, msg: err }));
  });
};
