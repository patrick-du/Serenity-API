const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Register & Login Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// User Model
const User = require("../models/User");

// User Methods
exports.registerUser = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) { // Check validation
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) { // If user already exists, return 400 error and JSON message
            return res.json({ success: false, msg: 'Email already exists' });
        } else {
            const newUser = new User({ // Creates new user model instance  
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json({ success: true, msg: `Successfully created new user. ${user}` }))
                        .catch(err => console.log(err));
                });
            });
        }
    });
}

exports.loginUser = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) { // Check validation
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({ email }).then(user => {
        if (!user) { // If user doesn't exist, return 400 error and JSON message
            return res.status(400).json({ emailnotfound: "Email not found" });
        }

        bcrypt.compare(password, user.password).then(isMatch => { // Compares req.password and user account password
            if (isMatch) { // If match, create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign( // Sign given payload into a JWT string
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({ success: true, token: `Bearer ${token}` });
                    }
                );
            } else { // If no match, return 401 error and JSON message
                return res.status(401).json({ success: false, msg: 'Authentication failed. Wrong password.' });
            }
        });
    });
}

exports.getAllUsers = (req, res) => {
    User.find((err, users) => {
        if (err) return console.error(err);
        res.send(users);
    });
}

exports.getSpecificUser = (req, res) => {
    const userId = req.params.userId
    User.findById(userId, (err, specificUser) => {
        res.send(specificUser);
    })
}

