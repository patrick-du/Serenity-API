const moment = require('moment');
const isEmpty = require("is-empty");

// Assessment Methods
exports.getPHQ9Entry = (req, res) => {
    const userId = req.params.userId
    User.findById(userId, (err, specificUser) => {
        res.send(dateFormatter(specificUser.assessments.PHQ9))
    })
}

exports.addPHQ9Entry = (req, res) => {
    const userId = req.params.userId
    const requestObject = {
        date: moment().format("dddd, MMMM Do YYYY"),
        score: sumScoreFromArr(req.body.submissionArr),
        level: PHQ9level(sumScoreFromArr(req.body.submissionArr))
    };

    const returnMessage = {
        score: requestObject.score,
        message: createPHQ9ReturnMessage(requestObject.score)
    }

    User.findById(userId, (err, specificUser) => {
        specificUser.assessments.PHQ9.push(requestObject)
        specificUser.save()
            .then(res.status(200).json({ returnMessage }))
            .catch(err => console.log(err));
    })
}

exports.deletePHQ9Entry = (req, res) => {
    const userId = req.params.userId
    const entryId = req.body.entryId
    User.findById(userId, (err, specificUser) => {
        let doc = specificUser.assessments.PHQ9.id(entryId);
        if (isEmpty(doc)) {
            return res.status(400).json({ entryNotFound: "Entry was not found" })
        } else {
            doc.remove()
            specificUser.save()
            return res.status(200).json({ Success: "True" })
        }
    })
}

exports.getGAD7Entry = (req, res) => {
    const userId = req.params.userId
    User.findById(userId, (err, specificUser) => {
        res.send(dateFormatter(specificUser.assessments.GAD7))
    })
}

exports.addGAD7Entry = (req, res) => {
    const userId = req.params.userId
    const requestObject = {
        date: moment().format("dddd, MMMM Do YYYY"),
        score: sumScoreFromArr(req.body.submissionArr),
        level: GAD7level(sumScoreFromArr(req.body.submissionArr))
    };

    const returnMessage = {
        score: requestObject.score,
        message: createGAD7ReturnMessage(requestObject.score)
    }

    User.findById(userId, (err, specificUser) => {
        specificUser.assessments.GAD7.push(requestObject)
        specificUser.save()
            .then(res.status(200).json({ returnMessage }))
            .catch(err => console.log(err));
    })
}

const sumScoreFromArr = (submissionArr) => {
    var sum = 0;
    submissionArr.forEach((el) => {
        sum += Number(el)
    })
    return sum
}

const PHQ9level = (score) => {
    if (score < 5) {
        return "None/Minimal"
    } else if (score >= 5 && score <= 9) {
        return "Mild"
    } else if (score >= 10 && score <= 14) {
        return "Moderate"
    } else if (score >= 15 && score <= 19) {
        return "Moderately Severe"
    } else if (score >= 20 && score <= 27) {
        return "Severe"
    }
}

const GAD7level = (score) => {
    if (score < 5) {
        return "None/Minimal"
    } else if (score >= 5 && score <= 9) {
        return "Mild"
    } else if (score >= 10 && score <= 14) {
        return "Moderate"
    } else if (score >= 15) {
        return "Severe"
    }
}

const createPHQ9ReturnMessage = (score) => {
    if (score < 5) {
        return "Your score falls in the none to minimal category in regards to depression severity. It should be noted that a clinician would most likely decide that you may not need depression treatment."
    } else if (score >= 5 && score <= 9) {
        return "Your score falls in the mild category in regards to depression severity. It should be noted that a clinician would use clinical judgement about treatment based on your duration of symptoms and functional impairment."
    } else if (score >= 10 && score <= 14) {
        return "Your score falls in the moderate category in regards to depression severity. It should be noted that a clinician would use clinical judgement about treatment based on your duration of symptoms and functional impairment."
    } else if (score >= 15 && score <= 19) {
        return "Your score falls in the moderately severe category in regards to depression severity. It should be noted that a clinician would treat you using antidepressants, psychotherapy or a combination of treatment. It is advised that you meet with a clinician."
    } else if (score >= 20 && score <= 27) {
        return "Your score falls in the severe category in regards to depression severity. It should be noted that a clinician would treat you using antidepressants with or without psychotherapy. It is strongly advised that you meet with a clinician."
    }
}
const createGAD7ReturnMessage = (score) => {
    if (score < 5) {
        return "Your score falls in the none to minimal anxiety category. It should be noted that a clinician would most likely decide that you may not need anxiety treatment. Functionally, you do not report limitations due to your symptoms."
    } else if (score >= 5 && score <= 9) {
        return "Your score falls in the mild anxiety category. It should be noted that a clinician would most likely further monitor you before taking action. Functionally, you may occasionally find it somewhat difficult to perform life tasks due to your symptoms."
    } else if (score >= 10 && score <= 14) {
        return "Your score falls in the moderate anxiety category. It should be noted that a clinician would require further assesments including a diagnostic interview and mental status exmaination as well as a referral to a mental health professional would be recommended. Functionally, you may find it very difficult to perform life tasks due to your symptoms."
    } else if (score >= 15) {
        return "Your score falls in the severe anxiety category. It should be noted that a clinician would most likely have active treatment warranted. Functionally, you may find it extremely difficult to perform life tasks due to your symptoms."
    }   
}

const dateFormatter = (PHQ9) => {
    PHQ9.forEach((obj) => {
        var momentObj = moment(obj.date, "dddd, MMMM Do YYYY");
        var momentString = momentObj.format('MM-DD-YYYY');
        obj.date = momentString;

    })
    return PHQ9;
}