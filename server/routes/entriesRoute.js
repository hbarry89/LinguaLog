const express = require('express');
const EntryModel = require('../models/Entries.js');

const router = express.Router();

// Prefix: /entries

router.get('/', async (req, res) => {
    try {
        const entries = await EntryModel.find();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
    
router.post('/', async (req, res) => {
    try {
        const newEntry = new EntryModel(req.body);
        await newEntry.save();
        res.json(newEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await EntryModel.findByIdAndDelete(id);
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;