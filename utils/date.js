const moment = require("moment");

exports.convertDateToMoment = (date) => {
  return moment(date, "YYYY-MM-DD").format("dddd, MMMM Do YYYY");
};
