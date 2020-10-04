const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getAllUsers,
  getSpecificUser,
  getUserJournals,
  createUserJournal,
  deleteUserJournal,
} = require("../controllers/userController");

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

// @desc    Return all journal entries linked to :userId
// @route   GET /users/:userId/journals
router.get(
  "/:userId/journals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => getUserJournals(req, res)
);

// @desc    Creates a journal entry for :userId
// @route   POST /users/:userId/journal
router.post(
  "/:userId/journals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => createUserJournal(req, res)
);

// @desc    Deletes a journal entry for :userId
// @route   DELETE /users/:userId/journal
router.delete(
  "/:userId/journals/:journalId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => deleteUserJournal(req, res)
);

module.exports = router;
