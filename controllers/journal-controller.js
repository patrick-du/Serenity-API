const User = require("../models/User");
const isEmpty = require('is-empty');
const moment = require('moment');


// Journal Methods
exports.getJournalEntry = (req, res) => {
    const userId = req.params.userId;
    User.findById(userId, (err, specificUser) => {
        res.send(specificUser.journals);
    })
}

exports.addJournalEntry = (req, res) => {
    if (isEmpty(req.body.entry)) {
        return res.status(400).json({ entryBody: "Empty" });
    }
    const userId = req.params.userId;
    const requestObject = {
        entry: req.body.entry,
        stressRating: req.body.stressRating,
        depressionRating: req.body.depressionRating,
        anxietyRating: req.body.anxietyRating,
        physicalActivityLevel: req.body.physicalActivityLevel
    };
    User.findById(userId, (err, specificUser) => {
        specificUser.journals.push(requestObject)
        specificUser.save()
            .then(res.status(200).json({ Success: "True" }))
            .catch(err => console.log(err));
    })
}

exports.deleteJournalEntry = (req, res) => {
    const userId = req.params.userId
    const journalId = req.body.journalId
    User.findById(userId, (err, specificUser) => {
        let doc = specificUser.journals.id(journalId);
        if (isEmpty(doc)) {
            res.send({ Success: "False" })
        } else {
            doc.remove()
            specificUser.save()
            res.send({ Success: "True" })
        }
    })
}


