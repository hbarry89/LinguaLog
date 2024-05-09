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
const UserModel = require('./models/Users');

app.get('/', (req, res) => {
    res.send('Welcome to LinguaLog!');
});

app.get('/users', async (req, res) => {
    const users = await UserModel.find();
    res.json(users);
});

app.post('/createUser', async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();
  res.json(req.body);
});

app.listen(_PORT, () => {
  console.log('Server is running');
});