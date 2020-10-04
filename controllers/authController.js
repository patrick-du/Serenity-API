const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validateRegisterInput } = require("../validation/register");
const { validateLoginInput } = require("../validation/login");
const { authErr } = require("../constants/errors");
require("dotenv").config();

exports.register = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { email, name, password } = req.body;
  if (!isValid) {
    return res.status(400).json({ ...authErr.FALSE, ...errors });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      console.log("asd");
      return res.status(400).json(authErr.EMAIL_IN_USE);
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) res.status(500).send();
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.status(200).json(authErr.REGISTER_SUCCESS))
            .catch((err) =>
              res.status(500).json({ ...authErr.FALSE, msg: err })
            );
        });
      });
    }
  });
};

exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;

  if (!isValid) {
    return res.status(400).json({ ...authErr.FALSE, ...errors });
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json(authErr.EMAIL_NOT_FOUND);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      // Compares req.password and user account password
      if (isMatch) {
        // If match, create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({ ...authErr.LOGIN_SUCCESS, token });
          }
        );
      } else {
        return res.status(400).json(authErr.LOGIN_FAILURE);
      }
    });
  });
};
