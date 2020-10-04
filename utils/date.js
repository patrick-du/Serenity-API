const moment = require("moment");

exports.convertDateToMoment = (date) => {
  return moment(date, "YYYY-MM-DD").format("dddd, MMMM Do YYYY");
};

exports.convertMomentToDate = (date) => {
  return moment(date, "dddd, MMMM Do YYYY").format("MM-DD-YYYY");
};

exports.newDate = (date) => {
  return moment().format("dddd, MMMM Do YYYY");
};
