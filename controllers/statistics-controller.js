const User = require("../models/User");

// Statistics Methods
exports.getJournalTrend = (req, res) => {
    const userId = req.params.userId

    let stressArr = []
    let depressionArr = []
    let anxietyArr = []

    User.findById(userId, (err, specificUser) => {
        for (i = 0; i < specificUser.journals.length;i++) {
            stressArr.push(specificUser.journals[i].stressRating)
            depressionArr.push(specificUser.journals[i].depressionRating)
            anxietyArr.push(specificUser.journals[i].anxietyRating)
        }
        res.send({stressArr, depressionArr, anxietyArr})
    })
}
