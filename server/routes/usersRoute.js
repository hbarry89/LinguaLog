require('dotenv').config();

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// IMPORT MODEL
const UserModel = require('../models/User.js');

/*
    User Endpoints
    Base path: /
*/

router.post('/create-account', async (req, res) => {
    try {
        const { username, password } = req.body;
        // const existingUser = await UserModel.findOne({ username });
        // if (existingUser) {
        //     return res.status(409).json({ message: 'Username already exists!' });
        // }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            password: hashedPassword
        });
        await newUser.save();
        res.json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        if (!users) {
            return res.status(404).json({ message: 'Users not found.' });
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).header('WWW-Authenticate', 'Basic realm="Secure Area"').json({ message: 'Incorrect username or password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).header('WWW-Authenticate', 'Basic realm="Secure Area"').json({ message: 'Incorrect username or password.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;