const express = require('express');
const router = express.Router();

// IMPORT MODEL
const EntryModel = require('../models/Entry.js');

/*
    Entries Endpoints
    Base path: /entries
*/

router.get('/', async (req, res) => {
    try {
        const entries = await EntryModel.find()
            .populate('createdBy', 'username')
            //.populate('editedBy', 'username');
        if (!entries) {
            return res.status(404).json({ message: 'Entries not found.' });
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
            return res.status(404).json({ message: 'Entry not found.' });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
    
router.post('/', async (req, res) => {
    try {
        const { word, definition, createdBy } = req.body;
        
        if (!word || !definition || !createdBy) {
          return res.status(400).json({ message: 'Word, definition, and createdBy are required.' });
        }
    
        const newEntry = new EntryModel({
          word,
          definition,
          createdBy
        });
        
        await newEntry.save();
        
        const populatedEntry = await EntryModel.findById(newEntry._id).populate('createdBy', 'username');
        
        res.status(201).json(populatedEntry);
      } catch (error) {
        console.error('Error creating entry:', error);
        res.status(500).json({ message: 'Failed to post entry.', error: error.message });
      }
    });

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEntryData = {
            ...req.body,
            editedBy: req.body.editedBy,
            editedAt: new Date()
        };
        const updatedEntry = await EntryModel.findByIdAndUpdate(id, updatedEntryData, { new: true });
        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await EntryModel.findByIdAndDelete(id);
        res.json({ message: 'Entry deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;