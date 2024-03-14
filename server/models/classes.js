const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    date: Date,
    instructor: String,
    classType: String,
    time: String,
    description: String,
    startDate: String,
    endDate: String,
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }] // Assuming 'Client' is the name of your client model});
});
module.exports = mongoose.model('Class', classSchema);
