const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");
const passport = require('passport');
require('./config/passport')(passport);

const { registerUser, loginUser, authCheck, getAllUsers, getSpecificUser } = require('./controllers/user-controller');
const { getJournalEntry, addJournalEntry, deleteJournalEntry, editJournalEntry } = require('./controllers/journal-controller');
const { getUserExercises, addUserExercise, deleteUserExercise, updateUserExercise, getSerenityExercises} = require('./controllers/exercise-controller');

/*Authentication [Access: Public]************************************************************************************************************************************************/


// @route POST register
// @desc Register the user
router.post("/register", (req, res) => registerUser(req, res));

// @route POST login
// @desc Login the user and return JWT
router.post("/login", (req, res) => loginUser(req, res));

// @route POST authCheck
// @desc Authentication checker 
router.get("/authCheck", passport.authenticate('jwt', {session: false}), (req, res) => authCheck(req, res));
 
/*User Routes [Access: Protected]****************************************************************************************************************************************************/


// @route [GET] users/all 
// @desc Returns all users
// @access PROTECTED
router.get("/users", passport.authenticate('jwt', {session: false}), (req, res) => getAllUsers(req,res));
  
// @route [GET] users/:id
// @desc Returns user
// @access PROTECTED 
router.get("/users/:userId", passport.authenticate('jwt', {session: false}), (req, res) => getSpecificUser(req,res));


/*Journal Routes [Access: Protected]********************************************************************************************************************************************/


// @route [GET] users/:id/journal - gets journal entries
router.get("/users/:userId/journals", passport.authenticate('jwt', {session: false}), (req, res) => getJournalEntry(req, res));


// @route [POST] users/:id/journal - adds journal entry
router.post("/users/:userId/journals", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => addJournalEntry(req, res));


// @route [DELETE] users/:id/journal - deletes journal entry
router.delete("/users/:userId/journals", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => deleteJournalEntry(req, res));


/*Exercise Routes [Access: Protected]********************************************************************************************************************************************/

// @route [GET] users/:id/exercises
// @desc Returns user exercises
router.get("/users/:userId/exercises",  passport.authenticate('jwt', {session: false}),  (req, res) => getUserExercises(req, res));

// @route POST exercise
// @desc Post exercise to DB
// router.post("/users/:userId/exercises", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => addUserExercise(req,res));

// @route DELETE exercise
// @desc Deletes exercise from DB
// router.delete("/users/:userId/exercises", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => deleteUserExercise(req,res));

// @route UPDATE exercise
// @desc Updates exercise from DB
// router.patch("/users/:userId/exercises", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => updateUserExercise(req,res));


module.exports = router;
