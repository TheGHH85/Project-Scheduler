const mongoose = require('mongoose');
const clientSchema = new mongoose.Schema({
    name: String, 
    owner: String,
    breed: String
});

module.exports = mongoose.model('Client', clientSchema);