const express = require('express');
const User = require('../models/user.model');

const router = express.Router()

// POST /users: Create a new user with an initial balance of Tocos.
router.post('/', async (req, res) => {
    const newUserId = req.body.id;
    const balance = req.body.balance;
    if (!newUserId || !balance) {
        res.status(400).json({ message: 'Request body should contains id and balance' });
        return;
    }
    const newUser = new User({
        id: newUserId,
        balance: balance
    });
    try {
        const existingUser = await User.find({ id: newUserId });
        if (existingUser.length > 0) {
            res.status(400).json({ message: `id ${newUserId} already exists` });
        } else {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// GET /users/{id}: Retrieve details of a user.
router.get('/:id', async (req, res) => {
    try {
        const user = await User.find({ id: req.params.id });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// GET /users: Get all user info.
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;