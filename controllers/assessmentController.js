const User = require("../models/User");
const { Assessment } = require("../models/Assessment");
const { userMsg, assessmentMsg } = require("../constants/responseMsg");
const { newDate, convertMomentToDate } = require("../utils/date");
const {
  sumAssessmentScore,
  phqLevel,
  phqResult,
  gadLevel,
  gadResult,
} = require("../utils/assessmentHelpers");

exports.getPHQEntries = (req, res) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      user.assessments.PHQ9.forEach((obj) => {
        return (obj.date = convertMomentToDate(obj.date));
      });
      res.json(user.assessments.PHQ9);
    }
  });
};

exports.addPHQEntry = (req, res) => {
  const { userId } = req.params;
  const { scoreArr } = req.body;

  const date = newDate();
  const score = sumAssessmentScore(scoreArr);
  const level = phqLevel(score);

  const assessment = new Assessment({
    date,
    score,
    level,
  });

  const response = {
    score,
    result: phqResult(score),
  };

  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      user.assessments.PHQ9.push(assessment);
      user
        .save()
        .then(res.json({ ...assessmentMsg.CREATED_ASSESSMENT, response }))
        .catch((err) =>
          res.status(500).json({ ...assessmentMsg.FALSE, msg: err })
        );
    }
  });
};

exports.deletePHQEntry = (req, res) => {
  const { userId, phqId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      const assessment = user.assessments.PHQ9.id(phqId);
      if (!assessment) {
        res.status(404).json(assessmentMsg.ASSESSMENT_NOT_FOUND);
      } else {
        assessment.remove();
        user
          .save()
          .then(res.json(assessmentMsg.DELETED_ASSESSMENT))
          .catch((err) =>
            res.status(500).json({ ...assessmentMsg.FALSE, msg: err })
          );
      }
    }
  });
};

exports.getGADEntries = (req, res) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      user.assessments.GAD7.forEach((obj) => {
        return (obj.date = convertMomentToDate(obj.date));
      });
      res.json(user.assessments.GAD7);
    }
  });
};

exports.addGADEntry = (req, res) => {
  const { userId } = req.params;
  const { scoreArr } = req.body;

  const date = newDate();
  const score = sumAssessmentScore(scoreArr);
  const level = gadLevel(score);

  const assessment = new Assessment({
    date,
    score,
    level,
  });

  const response = {
    score,
    result: gadResult(score),
  };

  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      user.assessments.GAD7.push(assessment);
      console.log(user.assessments.GAD7);
      user
        .save()
        .then(res.json({ ...assessmentMsg.CREATED_ASSESSMENT, response }))
        .catch((err) =>
          res.status(500).json({ ...assessmentMsg.FALSE, msg: err })
        );
    }
  });
};

exports.deleteGADEntry = (req, res) => {
  const { userId, gadId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      const assessment = user.assessments.GAD7.id(gadId);
      if (!assessment) {
        res.status(404).json(assessmentMsg.ASSESSMENT_NOT_FOUND);
      } else {
        assessment.remove();
        user
          .save()
          .then(res.json(assessmentMsg.DELETED_ASSESSMENT))
          .catch((err) =>
            res.status(500).json({ ...assessmentMsg.FALSE, msg: err })
          );
      }
    }
  });
};
