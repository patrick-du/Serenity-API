const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

// Load models
const Exercise = require("../models/Exercise");

/********************************************************************************************************************************************************************************/

// @route GET exercises
// @desc Returns all exercises in DB
router.get("/exercises", (req, res) => {
    Exercise.find((err, exercises) => {
        if (err) return console.error(err);
        res.send(exercises);
    });
})

// @route POST exercise
// @desc Post a single exercise to DB
router.post("/exercises/new", (req, res) => {

    if (isEmpty(req.body.name)) {
        res.send('Error! Exercise was not created.');
    } else {

    const requestObject = {
        name: req.body.name,
        description: req.body.description,
        equipmentType: req.body.equipmentType,
        createdBy: req.body.createdBy
    };
    
    const newExercise = new Exercise(requestObject);
    newExercise.save()
        .then(exercise => res.json(exercise))
        .catch(err => console.log(err))
    }
})



module.exports = router;

