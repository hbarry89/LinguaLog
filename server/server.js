// CREATE SERVER
const express = require('express');
const app = express();

// CONNECT TO DATABASE
const mongoose = require('mongoose');
mongoose.connect();

// IMPORT MODELS
const UserModel = require('./models/Users');

app.get('/', (req, res) => {
    res.send('Welcome to LinguaLog!');
});

app.get('/users', async (req, res) => {
    const users = await UserModel.find();
    res.json(users);
});

app.listen('3001', () => {
  console.log('Server is running on port 3001');
});