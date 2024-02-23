const express = require('express');
const router = express.Router();
const Class = require('../models/classes');
const moment = require('moment-timezone');
const Client = require('../models/clients');


// Example Express route for querying classes by date
router.get('/:date', async (req, res) => {
    const { date } = req.params; // e.g., "2024-02-04"

    // Convert from EST to UTC for querying
    let startDate = moment.tz(`${date} 00:00`, "America/New_York").utc();
    let endDate = moment.tz(`${date} 23:59`, "America/New_York").utc();

    try {
        const classes = await Class.find({
            date: {
                $gte: startDate.toDate(),
                $lt: endDate.toDate()
            }
        }).populate('clients');
        console.log('Classes found with client deatils:', classes); // Debugging
        res.json(classes);
    } catch (err) {
        console.error("Error fetching classes with client details:", err);
        res.status(500).json({ message: err.message });
    }
});
router.post('/add-class', async (req, res) => {
    const { date, instructor, classType, time } = req.body;
    
    // Convert the date string to a Date object
    const dateObj = new Date(date);

    // Optional: Validate the date format or the conversion result
    // This step is crucial to ensure the date is correctly formatted and valid.
    // For example, checking if dateObj is "Invalid Date"
    if (isNaN(dateObj.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
    }
    
    try {
        // Create a new Class instance with the converted Date object
        const newClass = new Class({
            date: dateObj,
            instructor,
            classType,
            time,
        });

        // Save the new class to the database
        const savedClass = await newClass.save();

        // Send a success response back with the saved class data
        res.status(201).json(savedClass);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add the class' });
    }
});

router.post('/:classId/add-client', async (req, res) => {
    const { classId } = req.params;
    const { clientId } = req.body;

    try {
        
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        
        const updateClass = await Class.findByIdAndUpdate(
            classId,
            { $addToSet: { clients: clientId } }, // This correctly updates the array
            { new: true }
        );
        
        if(!updateClass){
            return res.status(404).json({ message: "Class not found" });
        }

        res.json(updateClass);
    } catch (err) {
        console.error("Error adding client to class:", err);
        res.status(500).json({ message: err.message });
    }
    
    router.get('/class-details/:classId', async (req, res) => {
        const { classId } = req.params;
    
        try {
            const classWithClients = await Class.findById(classId)
                .populate('clients') // This line populates the client details
                .exec();
    
            if (!classWithClients) {
                return res.status(404).json({ message: "Class not found" });
            }
    
            console.log("Class with populated clients:", classWithClients);
            res.json(classWithClients);
        } catch (err) {
            console.error("Error fetching class details with clients:", err);
            res.status(500).json({ message: err.message });
        }
    });
    
        
});

module.exports = router;