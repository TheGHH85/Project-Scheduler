const express = require('express');
const router = express.Router();
const Class = require('../models/classes');

router.get('/classes/:date', async (req, res) => {
    try {
        const classes = await Class.find({ date: req.params.date });
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/add-class', async (req, res) => {
    console.log('Received data for new class:', req.body); // Log the incoming data

    const newClass = new Class({
        date: req.body.date,
        instructor: req.body.instructor,
        classType: req.body.classType,
        time: req.body.time,
    });

    try {
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;