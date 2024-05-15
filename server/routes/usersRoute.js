const express = require('express');
const router = express.Router();

// IMPORT MODELS
const UsersModel = require('../models/Users.js');

// Prefix: /users

router.get('/', async (req, res) => {
    try {
        const users = await UsersModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;