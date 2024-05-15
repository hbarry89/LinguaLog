require('dotenv').config();

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// IMPORT MODEL
const UsersModel = require('../models/Users.js');

/*
    User Endpoints
    Base path: /
*/

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await UsersModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UsersModel({
            username,
            password: hashedPassword
        });
        await newUser.save();
        res.json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UsersModel.findOne({ username });
        if (!user) {
            return res.status(401).header('WWW-Authenticate', 'Basic realm="Secure Area"').json({ message: 'Incorrect username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).header('WWW-Authenticate', 'Basic realm="Secure Area"').json({ message: 'Incorrect username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;