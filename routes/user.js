const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getAllUsers,
  getSpecificUser,
} = require("../controllers/userController");

const {
  getUserJournals,
  createUserJournal,
  deleteUserJournal,
} = require("../controllers/journalController");

const {
  getPHQEntries,
  addPHQEntry,
  deletePHQEntry,
  getGADEntries,
  addGADEntry,
  deleteGADEntry,
} = require("../controllers/assessmentController");

const { getJournalTrend } = require("../controllers/statisticsController");

// @desc    Return all users
// @route   GET /users/all
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  getAllUsers(req, res)
);

// @desc    Return one user
// @route   GET /users/:userId
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => getSpecificUser(req, res)
);

// @desc    Return all user journal entries
// @route   GET /users/:userId/journals
router.get(
  "/:userId/journals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => getUserJournals(req, res)
);

// @desc    Creates user journal entry
// @route   POST /users/:userId/journal
router.post(
  "/:userId/journals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => createUserJournal(req, res)
);

// @desc    Deletes user journal entry
// @route   DELETE /users/:userId/journal/:journalId
router.delete(
  "/:userId/journals/:journalId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => deleteUserJournal(req, res)
);

// @desc    Returns all user PHQ-9 entries
// @route   GET /users/:userId/assessments/phq
router.get(
  "/:userId/assessments/phq",
  passport.authenticate("jwt", { session: false }),
  (req, res) => getPHQEntries(req, res)
);

// @desc    Creates user PHQ-9 entry
// @route   POST /users/:userId/assessments/phq
router.post(
  "/:userId/assessments/phq",
  passport.authenticate("jwt", { session: false }),
  (req, res) => addPHQEntry(req, res)
);

// @desc    Deletes user PHQ-9 entry
// @route   DELETE /users/:userId/assessments/phq/:phqId
router.delete(
  "/:userId/assessments/phq/:phqId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => deletePHQEntry(req, res)
);

// @desc    Returns all user GAD-7 entries
// @route   GET /users/:userId/assessments/gad
router.get(
  "/:userId/assessments/gad",
  passport.authenticate("jwt", { session: false }),
  (req, res) => getGADEntries(req, res)
);

// @desc    Creates user GAD-7 entry
// @route   POST /users/:userId/assessments/gad
router.post(
  "/:userId/assessments/gad",
  passport.authenticate("jwt", { session: false }),
  (req, res) => addGADEntry(req, res)
);

// @desc    Deletes user GAD-7 entry
// @route   DELETE /users/:userId/assessments/phq/:gadId
router.delete(
  "/:userId/assessments/gad/:gadId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => deleteGADEntry(req, res)
);

// @desc    Returns user journal trends
// @route   GET /users/:userId/statistics/trends
router.get(
  "/:userId/statistics/trends",
  passport.authenticate("jwt", { session: false }),
  (req, res) => getJournalTrend(req, res)
);

module.exports = router;
