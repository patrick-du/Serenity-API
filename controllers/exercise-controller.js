const User = require("../models/User");
const SerenityExercise = require("../models/SerenityExercise");
const isEmpty = require('is-empty');

// getToken method
getToken = (headers) => {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

// User Exercise Methods
exports.getUserExercises = (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        const userId = req.params.userId
        User.findById(userId, (err, specificUser) => {
            res.send(specificUser.exercises);
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
}

exports.addUserExercise = (req, res) => {
    var token = getToken(req.headers);
    if (token) {
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
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
}

exports.deleteUserExercise = (req, res) => {
    var token = getToken(req.headers);
    if (token) {
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
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
}

// Serenity Exercise Methods
exports.getSerenityExercises = (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        SerenityExercise.find((err, exercise) => {
            res.send(exercise);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
}

