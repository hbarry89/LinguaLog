// USE DOTENV
require('dotenv').config();

// CREATE SERVER
const express = require('express');
const app = express();
const _PORT = process.env.PORT || 3001;
app.use(express.json());

// USE CORS
const cors = require('cors');
app.use(cors());

// CONNECT TO DATABASE
const username = process.env.DATABASE_USERNAME,
      password = process.env.DATABASE_PASSWORD,
      cluster = process.env.DATABASE_CLUSTER,
      database = process.env.DATABASE_NAME

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.islrhrq.mongodb.net/${database}`);

// IMPORT MODELS
const EntryModel = require('./models/Entries');

app.get('/', (req, res) => {
    res.send('Welcome to LinguaLog!');
});

app.get('/entries', async (req, res) => {
try {
    const entries = await EntryModel.find();
    res.json(entries);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

app.post('/createEntry', async (req, res) => {
try {
    const newEntry = new EntryModel(req.body);
    await newEntry.save();
    res.json(newEntry);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

app.delete('/deleteEntry/:id', async (req, res) => {
const { id } = req.params;

try {
    await EntryModel.findByIdAndDelete(id);
    res.json({ message: 'Entry deleted successfully' });
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

app.listen(_PORT, () => {
  console.log('Server is running');
});