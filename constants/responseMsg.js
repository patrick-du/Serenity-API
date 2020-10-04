// Generic Messages
const FALSE = { success: false };
const TRUE = { success: true };

// Authentication Messages
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

// User Messages
const NO_USERS = {
  ...FALSE,
  msg: "No users were found.",
};

const USER_NOT_FOUND = {
  ...FALSE,
  msg: "User was not found.",
};

// Journal Messages
const JOURNAL_NOT_FOUND = {
  ...FALSE,
  msg: "Journal was not found.",
};

const CREATED_JOURNAL = {
  ...TRUE,
  msg: `Successfuly created journal entry.`,
};

const DELETED_JOURNAL = {
  ...TRUE,
  msg: `Successfuly deleted journal entry.`,
};

// Assessment Messages
const ASSESSMENT_NOT_FOUND = {
  ...FALSE,
  msg: "Assessment was not found.",
};

const CREATED_ASSESSMENT = {
  ...TRUE,
  msg: `Successfuly created assessment entry.`,
};

const DELETED_ASSESSMENT = {
  ...TRUE,
  msg: `Successfuly deleted assessment entry.`,
};

// Error Objects
const genericMsg = {
  TRUE,
  FALSE,
};

const authMsg = {
  ...genericMsg,
  EMAIL_IN_USE,
  EMAIL_NOT_FOUND,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
};

const userMsg = {
  ...genericMsg,
  NO_USERS,
  USER_NOT_FOUND,
};

const journalMsg = {
  ...genericMsg,
  JOURNAL_NOT_FOUND,
  CREATED_JOURNAL,
  DELETED_JOURNAL,
};

const assessmentMsg = {
  ...genericMsg,
  ASSESSMENT_NOT_FOUND,
  CREATED_ASSESSMENT,
  DELETED_ASSESSMENT,
};

const statsMsg = {
  ...genericMsg,
};

// Error Exports
module.exports = {
  authMsg,
  userMsg,
  journalMsg,
  assessmentMsg,
  statsMsg,
};
