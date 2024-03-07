const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const router = express.Router();

router.post('/login', (req,res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: "No user exists" });
        }
        req.logIn(user, err => {
            if (err) {
                return res.status(500).json({ success: false, message: "Internal server error" });
            }
            return res.status(200).json({ success: true, message: "Successfully authenticated", user: user });

        });
    })(req, res, next);
});

router.post('/register', async (req, res) => {
    try {
        // Check if a user with the given email already exists
        const userExists = await User.findOne({ username: req.body.username });

        // If a user exists, return a 409 Conflict status with a message
        if (userExists) {
            return res.status(409).send("User Already Exists");
        }

        // If the user does not exist, hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user with the hashed password
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        // Send a response indicating that the user was created
        res.send("User Created");
    } catch (err) {
        // If an error occurs, send a 500 Internal Server Error status
        res.status(500).send("An error occurred");
        throw err;
    }
});

router.get('/checkAuth', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({ success: true, message: "Authenticated", user: req.user });
    }
    return res.status(401).json({ success: false, message: "Not authenticated" });
});

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Internal server error" });
            }
            res.clearCookie('connect.sid');
            return res.status(200).json({ success: true, message: "Successfully logged out" });
        });
    });
});

router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ isAuthenticated: true, user: req.user });
    } else {
        res.status(401).json({ isAuthenticated: false, message: "Not Authenticated" });
    }
});

module.exports = router;