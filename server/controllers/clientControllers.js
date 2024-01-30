const express = require('express');
const router = express.Router();
const Client = require('../models/clients');


/**
 * @route POST /add-client to database
 */
router.post('/add-client', function (req, res) {
    const clientInfo = req.body;

    const newClient = new Client({
        name: clientInfo.name,
        owner: clientInfo.owner,
        breed: clientInfo.breed
    });
    
    newClient.save()
    .then(() => {
        res.status(200).send({ message: 'Client Added to the database'});
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });

});

module.exports = router;