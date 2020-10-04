const Validator = require("validator");
const isEmpty = require("is-empty");

exports.validateLoginInput = ({ email, password }) => {
  let errors = { msg: [] };

  // Validator only works on empty strings - if field is empty, set to ""
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  // Email Checks
  if (Validator.isEmpty(email)) {
    errors.msg.push("Email field is required.");
  } else if (!Validator.isEmail(email)) {
    errors.msg.push("Email is invalid.");
  }

  // Password Checks
  if (Validator.isEmpty(password)) {
    errors.msg.push("Password field is required.");
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
