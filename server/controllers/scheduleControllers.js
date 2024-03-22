const express = require('express');
const router = express.Router();
const Class = require('../models/classes');
const moment = require('moment-timezone');
const Client = require('../models/clients');


// Example Express route for querying classes by date
router.get('/:date', async (req, res) => {
    const { date } = req.params; // Assuming date is in the format "YYYY-MM-DD"

    
    // Now currentDate represents the date increased by 1 day
    
    // Convert from EST to UTC for querying
    const startDate = moment.tz(`${date} 00:00`, "America/New_York").utc();
    const endDate = moment.tz(`${date} 23:59`, "America/New_York").utc();

    try {
        const classes = await Class.find({
            date: {
                $gte: startDate.toDate(),
                $lt: endDate.toDate()
            }
        }).populate('clients');
    
        res.json(classes);
    } catch (err) {
        console.error("Error fetching classes with client details:", err);
        res.status(500).json({ message: err.message });
    }
});
router.post('/add-class', async (req, res) => {
    const { date, instructor, classType, time, description, startDate, endDate} = req.body;
    
    // Convert the date string to a Date object using moment to handle timezone correctly
    const initialDate = moment.tz(date, "YYYY-MM-DD", "America/New_York").startOf('day');

    // Check if the date is valid
    if (!initialDate.isValid()) {
        return res.status(400).json({ message: "Invalid date format" });
    }
    
    try {
        // Array to hold promises for all class saves
        let saveClassPromises = [];

        // Save the initial class and then iterate for the next 7 weeks
        for (let week = 0; week < 8; week++) { // Change from 7 to 8 iterations
            // Calculate the date for this week's class
            const classDate = week === 0 ? initialDate : initialDate.clone().add(week, 'weeks');

            // Create a new Class instance for this week
            const newClass = new Class({
                date: classDate.toDate(), // Convert moment object back to JS Date
                instructor,
                classType,
                time,
                description,
                startDate,
                endDate,
            });

            // Push the save promise to our array
            saveClassPromises.push(newClass.save());
        }

        // Wait for all class instances to be saved
        const savedClasses = await Promise.all(saveClassPromises);

        // Send a success response back with the saved class data
        console.log("Classes saved:", savedClasses);
        res.status(201).json(savedClasses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add the class' });
    }
});


router.post('/:classId/add-client', async (req, res) => {
    const { classId } = req.params;
    const { clientId } = req.body;

    try {
        // First, find the original class to get its details
        const originalClass = await Class.findById(classId);
        if (!originalClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Use details from the original class to find all matching classes within the next 8 weeks
        const endDate = new Date(originalClass.date);
        endDate.setDate(endDate.getDate() + 8 * 7); // 8 weeks from the original class date

        const matchingClasses = await Class.find({
            instructor: originalClass.instructor,
            classType: originalClass.classType,
            time: originalClass.time,
            description: originalClass.description,
            startDate: originalClass.startDate,
            endDate: originalClass.endDate,
            date: { $gte: originalClass.date, $lte: endDate }
        });

        // Add the client to each matching class
        const updatePromises = matchingClasses.map(classToUpdate => 
            Class.findByIdAndUpdate(classToUpdate._id, { $addToSet: { clients: clientId } }, { new: true })
        );

        await Promise.all(updatePromises);

        res.json({ message: "Client added to all matching classes" });
    } catch (err) {
        console.error("Error adding client to class:", err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/remove-client', async (req, res) => {
    console.log("Request to remove client received:", req.body);

    const { clientId, startDate, classId } = req.body;

    try {
        // Find the class from which the client is to be removed to get its details
        const classToRemoveFrom = await Class.findById(classId);
        if (!classToRemoveFrom) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Define the query to find all future instances of this class
        const query = {
            instructor: classToRemoveFrom.instructor,
            classType: classToRemoveFrom.classType,
            time: classToRemoveFrom.time,
            // Ensure we're selecting classes on or after the provided startDate
            date: { $gte: new Date(startDate) }
        };

        // Perform the update operation
        const result = await Class.updateMany(query, {
            $pull: { clients: clientId }
        });

        if(result.modifiedCount === 0) {
            console.log("No classes were updated.");
            return res.status(204).send();
        }

        console.log(`Removed client from ${result.modifiedCount} classes.`);
        res.json({ message: `Client removed from future classes starting from ${startDate}.` });
    } catch (error) {
        console.error("Error removing client from classes:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/api/scheduled-dates', async (req, res) => {
    try {
      // Fetch all distinct dates from the classes collection
      // This assumes 'date' is stored in a format that can be directly used for comparison and aggregation
      // If your date is stored in a different format, you might need to adjust the query accordingly
      const dates = await Class.distinct("date");
      
      // Optionally, format dates or perform additional filtering here
      const formattedDates = dates.map(date =>
        moment(date).format('YYYY-MM-DD') // Format each date as 'YYYY-MM-DD'
      );
  
      // Send the distinct dates back as the response
      res.json(formattedDates);
    } catch (err) {
      console.error("Error fetching scheduled class dates:", err);
      res.status(500).json({ message: "Failed to fetch scheduled class dates." });
    }
  });




module.exports = router;