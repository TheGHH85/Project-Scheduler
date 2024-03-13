const express = require('express');
const router = express.Router();
const Client = require('../models/clients');


/**
 * @route POST /add-client to database
 */
router.post('/add-client', function (req, res) {
    console.log(req.body); // This should include the 'status' field
    const clientInfo = req.body;

    const newClient = new Client({
        name: clientInfo.name,
        owner: clientInfo.owner,
        breed: clientInfo.breed,
        email: clientInfo.email,
        status: clientInfo.status,
    });
    
    newClient.save()
    .then(() => {
        res.status(200).send({ message: 'Client Added to the database'});
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });

});

router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (err) {
        console.error("Error fetching clients:", err);
        res.status(500).json({ message: err.message });
    }
});

router.delete('/clients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Client.findByIdAndDelete(id);
        res.status(200).send({ message: 'Client deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error deleting client' });
    }
});

router.put('/clients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedClient = await Client.findByIdAndUpdate(id, updateData, { new: true }); // 'new: true' returns the updated document
        res.status(200).json(updatedClient);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating client' });
    }
});

module.exports = router;