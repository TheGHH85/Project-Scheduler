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
            password: hashedPassword,
            role: req.body.role
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

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error("Error fetching clients:", err);
        res.status(500).json({ message: err.message });
    }
});

// Import necessary libraries and models at the beginning of your file
// Assuming bcrypt and User model are already imported

// Add this endpoint to your Express router
router.post('/users/:id', async (req, res) => {
    try {
        const { password, role, username } = req.body;

        // If there's a password to update, hash it
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update the user with new data, only updating the fields that were provided
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            ...(username && { username }),
            ...(role && { role }),
            ...(password && { password: hashedPassword })
        }, { new: true }); // { new: true } ensures the returned document is the updated one

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        // You might not want to send back the password, even in hashed form
        const { password: _, ...userWithoutPassword } = updatedUser.toObject();
        res.status(200).json(userWithoutPassword);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).send("An error occurred");
    }
});


module.exports = router;