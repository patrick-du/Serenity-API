const User = require("../models/User");
const { userMsg } = require("../constants/responseMsg");

exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(404).json(userMsg.NO_USERS);
    } else {
      res.json(users);
    }
  });
};

exports.getSpecificUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    if (err) {
      res.status(404).json(userMsg.USER_NOT_FOUND);
    } else {
      res.json(user);
    }
  });
};
