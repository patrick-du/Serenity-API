const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

// BodyParser Middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.get('*', (req,res) => {
    res.sendFile('index.html', {root: __dirname});})

// DB Config
const db = require("./config/keys").mongoURI;

mongoose
    .connect(
        db,
        { useNewUrlParser: true, useUnifiedTopology: true }
     )
     .then (() => console.log("MongoDB successfully connected"))
     .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/users", users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}!`));

