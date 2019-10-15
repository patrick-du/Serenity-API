const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load user model
const User = require("../../models/User");

// @route POST users/register
// @desc Register the user
// @access Public

router.post("/register", (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    
    if(!isValid){ // Check validation
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if(user) { // If user already exists, return 400 error and JSON message
            return res.status(400).json({email: "Email already exists"});
        } else {
            const newUser = new User ({ // Creates new user model instance  
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST users/login
// @desc Login the user and return JWT
// @access Public

router.post("/login", (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){ // Check validation
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if(!user){ // If user doesn't exist, return 400 error and JSON message
            return res.status(400).json({emailnotfound: "Email not found"});
        }

        bcrypt.compare(password, user.password).then(isMatch => { // Compares req.password and user account password
            if(isMatch){ // If match, create JWT payload
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
                        res.json({ success: true, token: "Bearer" + token});
                    }
                );
            } else { // If no match, return 400 error and JSON message
                return res.status(400).json({passwordincorret: "Password incorrect"});
            }
        });
    });
});


// @route GET users/all
// @desc Returns all the users in the collection
// @access Public
router.get("/all", (req, res) => {

    User.find((err, found) => {
        if(err) return console.error(err);
        res.json(found)
    })
});


module.exports = router;
