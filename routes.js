const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const { registerUser, loginUser, getAllUsers, getSpecificUser } = require('./controllers/user-controller');
const { getUserExercises, addUserExercise, deleteUserExercise, getSerenityExercises} = require('./controllers/exercise-controller');

/*Authentication [Access: Public]************************************************************************************************************************************************/


// @route POST users/register
// @desc Register the user
router.post("/register", (req, res) => registerUser(req, res));

// @route POST users/login
// @desc Login the user and return JWT
router.post("/login", (req, res) => loginUser(req, res));


/*User Routes [Access: Protected]****************************************************************************************************************************************************/


// @route [GET] users/all 
// @desc Returns all users
// @access PROTECTED
router.get("/users", (req, res) => getAllUsers(req,res));

// @route [GET] users/:id
// @desc Returns user
// @access PROTECTED 
router.get("/users/:userId", (req, res) => getSpecificUser(req,res));


/*User Exercise Routes [Access: Protected]********************************************************************************************************************************************/


// @route [GET] users/:id/exercises
// @desc Returns user exercises
router.get("/users/:userId/exercises", (req, res) => getUserExercises(req, res));


// @route POST exercise
// @desc Post exercise to user exercises
router.post("/users/:userId/exercises", (req, res) => addUserExercise(req,res));

// @route POST exercise
// @desc Post a single exercise to DB
router.delete("/users/:userId/exercises/:exerciseId", (req, res) => deleteUserExercise(req,res));

/*
// @route POST users/:id/exercises/delete
// @desc Deletes an exercise object for the user 
router.post("/users/:id/exercises/delete", (req, res) => {
    const id = req.params.id
    const exerciseId = req.body.exerciseId

    User.findById(id, (err, specificUser) => {
        specificUser.exercises.pull(exerciseId);
        specificUser.save((err) => {
            if (err) return handleError(err)
            res.send('Success! Deleted the exercise from user DB')
        });
    })
});
*/


/*Serenity Exercise Routes [Access: Protected]********************************************************************************************************************************************/

// @route [GET] users/:id/exercises
// @desc Returns a user exercises object
router.get("/serenityExercises", (req, res) => getSerenityExercises(req, res));

module.exports = router;
