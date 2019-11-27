const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const bodyParser = require("body-parser");
const passport = require("passport");

const db = require("./config/keys").mongoURI;
const routes = require("./routes");

const auth = require("./config/passport")

// BodyParser MiddleWare
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(cors());

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}!`));

