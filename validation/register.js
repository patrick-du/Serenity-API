const Validator = require("validator");
const isEmpty = require("is-empty");

exports.validateRegisterInput = ({ name, email, password, password2 }) => {
  let errors = { msg: [] };

  // Validator only works on empty strings - if field is empty, set to ""
  name = !isEmpty(name) ? name : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  password2 = !isEmpty(password2) ? password2 : "";

  // Name Check
  if (Validator.isEmpty(name)) {
    errors.msg.push("Name field is required.");
  }

  // Email Check
  if (Validator.isEmpty(email)) {
    errors.msg.push("Email field is required.");
  } else if (!Validator.isEmail(email)) {
    errors.msg.push("Email is invalid.");
  }

  // Password Check
  if (Validator.isEmpty(password)) {
    errors.msg.push("Password field is required.");
  }

  if (Validator.isEmpty(password2)) {
    errors.msg.push("Password confirmation field is required.");
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.msg.push("Password must be at least 6 characters.");
  }

  if (!Validator.equals(password, password2)) {
    errors.msg.push("Passwords must match.");
  }

  return {
    errors,
    isValid: isEmpty(errors.msg),
  };
};
