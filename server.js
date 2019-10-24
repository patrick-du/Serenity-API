const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const passport = require("passport");

const db = require("./config/keys").mongoURI;
const routes = require("./routes");


// BodyParser MiddleWare
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// Cors Bypass Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Server Setup
mongoose
    .connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(routes);

app.use((req,res,next) => {
    if (req.body) log.info(req.body);
    if (req.params) log.info(req.params);
    if(req.query) log.info(req.query);
    log.info(`Received a ${req.method} request from ${req.ip} for                ${req.url}`);
  next();
});
app

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}!`));

