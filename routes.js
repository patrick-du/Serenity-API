const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");
const passport = require('passport');
require('./config/passport')(passport);

const { registerUser, loginUser, getAllUsers, getSpecificUser } = require('./controllers/user-controller');
const { getJournalEntry, addJournalEntry, deleteJournalEntry, editJournalEntry } = require('./controllers/journal-controller');
const { getUserExercises, addUserExercise, deleteUserExercise, updateUserExercise, getSerenityExercises} = require('./controllers/exercise-controller');
const { getPHQ9Entry, addPHQ9Entry, deletePHQ9Entry, getGAD7Entry, addGAD7Entry, deleteGAD7Entry } = require('./controllers/assessment-controller');
const { getJournalTrend } = require('./controllers/statistics-controller');


/************************************************************************************************************************************************************************************/
/*[PUBLIC]***************************************************************************************************************************************************************************/
/************************************************************************************************************************************************************************************/


/*Authentication*********************************************************************************************************************************************************************/


// @route POST register
// @desc Register the user
router.post("/register", (req, res) => registerUser(req, res));


// @route POST login
// @desc Login the user and return JWT
router.post("/login", (req, res) => loginUser(req, res));

/************************************************************************************************************************************************************************************/
/*[PROTECTED]************************************************************************************************************************************************************************/
/************************************************************************************************************************************************************************************/


/*User Routes************************************************************************************************************************************************************************/


// @route [GET] users/all 
// @desc Returns all users
router.get("/users", passport.authenticate('jwt', {session: false}), (req, res) => getAllUsers(req,res));
  

// @route [GET] users/:id
// @desc Returns user
router.get("/users/:userId", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => getSpecificUser(req,res));


/*Journal Routes*********************************************************************************************************************************************************************/


// @route [GET] users/:id/journal
// @desc Returns all journal entries
router.get("/users/:userId/journals", passport.authenticate('jwt', {session: false}), (req, res) => getJournalEntry(req, res));


// @route [POST] users/:id/journal
// @desc Creates journal entry
router.post("/users/:userId/journals", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => addJournalEntry(req, res));


// @route [DELETE] users/:id/journal
// @desc Deletes journal entry
router.delete("/users/:userId/journals", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => deleteJournalEntry(req, res));


/*Assessment Routes *****************************************************************************************************************************************************************/


// @route [GET] users/:id/assessments/PHQ9
// @desc Returns all PHQ-9 entries
router.get("/users/:userId/assessments/PHQ9", /*passport.authenticate('jwt', {session: false}), */ (req, res) => getPHQ9Entry(req, res));


// @route [POST] users/:id/assessments/PHQ9
// @desc Creates PHQ9 entry
router.post("/users/:userId/assessments/PHQ9", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => addPHQ9Entry(req, res));


// @route [DELETE] users/:id/PHQ9
// @desc Deletes PHQ9 entry
router.delete("/users/:userId/assessments/PHQ9", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => deletePHQ9Entry(req, res));


// @route [GET] users/:id/assessments/GAD7
// @desc Returns all GAD-7 entries
router.get("/users/:userId/assessments/GAD7", /*passport.authenticate('jwt', {session: false}), */ (req, res) => getGAD7Entry(req, res));


// @route [POST] users/:id/assessments/GAD7
// @desc Creates GAD7 entry
router.post("/users/:userId/assessments/GAD7", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => addGAD7Entry(req, res));


// @route [DELETE] users/:id/assessments/GAD7
// @desc Deletes GAD7 Entry
router.delete("/users/:userId/assessments/GAD7", /*passport.authenticate('jwt', {session: false}),*/ (req, res) => deleteGAD7Entry(req, res));
module.exports = router;


/*Statistics Routes *****************************************************************************************************************************************************************/


// @route [GET] users/:id/statistics/trends
// @desc Returns all journal trends
router.get("/users/:userId/statistics/trends", /*passport.authenticate('jwt', {session: false}), */ (req, res) => getJournalTrend(req, res));
