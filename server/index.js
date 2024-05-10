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
const username = process.env.DATABASE_USERNAME,
      password = process.env.DATABASE_PASSWORD,
      cluster = process.env.DATABASE_CLUSTER,
      database = process.env.DATABASE_NAME

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.islrhrq.mongodb.net/${database}`);

app.get('/', (req, res) => {
    res.send('Welcome to LinguaLog!');
});

// IMPORT ROUTES
const entriesRoute = require('./routes/entriesRoute');
app.use('/entries', entriesRoute);

app.listen(port, () => {
  console.log('Server is running');
});