const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    date: Date, 
    instructor: String,
    classType: String,
    time: String,
    
});

module.exports = mongoose.model('Class', classSchema);