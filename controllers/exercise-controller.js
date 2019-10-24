const User = require("../models/User");
const SerenityExercise = require("../models/SerenityExercise");
const isEmpty = require('is-empty');

// User Exercise Methods
exports.getUserExercises = (req, res) => {
    const userId = req.params.userId
    User.findById(userId, (err, specificUser) => {
        res.send(specificUser.exercises);
    })
}

exports.addUserExercise = (req, res) => {
    if (isEmpty(req.body.name)) {
        res.send({ Success: "False" });
    } else {

        const userId = req.params.userId
        const requestObject = {
            createdBy: req.body.createdBy,
            name: req.body.name,
            primaryMuscles: req.body.primaryMuscles,
            equipmentType: req.body.equipmentType,
        };

        User.findById(userId, (err, specificUser) => {
            specificUser.exercises.push(requestObject)
            specificUser.save()
            res.send({ Success: "True" })
        })
    }
}

exports.deleteUserExercise = (req, res) => {
    const userId = req.params.userId
    const exerciseId = req.params.exerciseId
    User.findById(userId, (err, specificUser) => {
        let doc = specificUser.exercises.id(exerciseId);
        if (isEmpty(doc)) {
            res.send({ Success: "False" })
        } else {
            doc.remove()
            specificUser.save()
            res.send({ Success: 'True' })
        }
    })
}

// Serenity Exercise Methods
exports.getSerenityExercises = (req, res) => {
    SerenityExercise.find((err, exercise) => {
        res.send(exercise);
    });
}

