const express = require('express');
const router = express.Router();

// IMPORT MODEL
const EntryModel = require('../models/Entries.js');

/*
    Entries Endpoints
    Base path: /entries
*/

router.get('/', async (req, res) => {
    try {
        const entries = await EntryModel.find();
        if (!entries) {
            return res.status(404).json({ message: 'Entries not found' });
        }
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const entry = await EntryModel.findById(id);
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
    
router.post('/', async (req, res) => {
    try {
        // const { word } = req.body;
        // const existingWord = await EntryModel.findOne({ word });
        // if (existingWord) {
        //     return res.status(409).json({ message: 'Word already exists!' });
        // }

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
        // const { word } = req.body;
        // const existingWord = await EntryModel.findOne({ word });
        // if (existingWord) {
        //     return res.status(409).json({ message: 'Word already exists!' });
        // }
        
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