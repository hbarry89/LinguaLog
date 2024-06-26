// USE DOTENV
require('dotenv').config();

// CREATE SERVER
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

// USE CORS
const cors = require('cors');
app.use(cors());

// CONNECT TO DATABASE
const mongodbURI = process.env.MONGODB_URI;

const mongoose = require('mongoose');
mongoose.connect(mongodbURI);

app.get('/', (req, res) => {
    res.send(`Welcome to LinguaLog! MongoDB connection status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});

// IMPORT ROUTES
const usersRoute = require('./routes/usersRoute');
app.use('/', usersRoute);

const entriesRoute = require('./routes/entriesRoute');
app.use('/entries', entriesRoute);

app.listen(port, () => {
    console.log('Server is running');
});