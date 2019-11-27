const User = require("../models/User");

// User Exercise Methods
exports.getUserExercises = (req, res) => {
        const userId = req.params.userId
        User.findById(userId, (err, specificUser) => {
            res.send(specificUser.exercises);
        })
}
/* 
exports.addUserExercise = (req, res) => {
   
        if (isEmpty(req.body.name)) {
            res.send({ Success: "False" });
        } else {
            const userId = req.params.userId
            const requestObject = {
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
        const exerciseId = req.body.exerciseId
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

exports.updateUserExercise = (req, res) => {
   
        const userId = req.params.userId
        const exerciseId = req.body.exerciseId
        User.findById(userId, (err, specificUser) => {
            let doc = specificUser.exercises.id(exerciseId);
            if (isEmpty(doc)) {
                res.send({ Success: "False" })
            } else {
                doc.name = req.body.name ? req.body.name : doc.name
                doc.primaryMuscles = req.body.primaryMuscles ? req.body.primaryMuscles : doc.primaryMuscles
                doc.equipmentType = req.body.equipmentType ? req.body.equipmentType : doc.equipmentType
                specificUser.save()
                res.send({ Success: 'True' })
            }
        })
    
} */
