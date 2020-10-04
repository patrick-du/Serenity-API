// Generic Error Messages
const FALSE = { success: false };
const TRUE = { success: true };

// Authentication Error Messages
const EMAIL_IN_USE = { ...FALSE, msg: "Email already in use." };
const EMAIL_NOT_FOUND = { success: false, msg: "Email was not found." };
const REGISTER_SUCCESS = {
  ...TRUE,
  msg: `Successfully created user, please sign in.`,
};
const LOGIN_SUCCESS = {
  ...TRUE,
  msg: `Successfully logged in.`,
};
const LOGIN_FAILURE = {
  ...FALSE,
  msg: "Login failed.",
};

// User Error Messages
const NO_USERS = {
  ...FALSE,
  msg: "No users were found.",
};

const USER_NOT_FOUND = {
  ...FALSE,
  msg: "User was not found.",
};

// Journal Error Messages
const JOURNAL_NOT_FOUND = {
  ...FALSE,
  msg: "Journal was not found.",
};

const CREATED_JOURNAL = {
  ...TRUE,
  msg: `Successfuly created journal.`,
};

const DELETED_JOURNAL = {
  ...TRUE,
  msg: `Successfuly deleted journal.`,
};

// Error Objects
const genericErr = {
  TRUE,
  FALSE,
};

const authErr = {
  ...genericErr,
  EMAIL_IN_USE,
  EMAIL_NOT_FOUND,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
};

const userErr = {
  ...genericErr,
  NO_USERS,
  USER_NOT_FOUND,
};

const journalErr = {
  ...genericErr,
  JOURNAL_NOT_FOUND,
  CREATED_JOURNAL,
  DELETED_JOURNAL,
};

// Error Exports
module.exports = {
  genericErr,
  authErr,
  userErr,
  journalErr,
};
