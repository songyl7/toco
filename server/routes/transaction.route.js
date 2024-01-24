const express = require('express');
const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

const router = express.Router()

const findUserById = async (userId) => {
    const user = await User.find({ id: userId });
    if (!user.length) {
        return undefined;
    }
    return user[0];
}

// POST /transactions: Perform a transaction between two users.
router.post('/', async (req, res) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const amount = req.body.amount;
    if (!senderId || !receiverId || !amount) {
        res.status(400).json({ message: 'Request body should contain senderId, receiverId and amount' });
        return;
    }
    try {
        const sender = await findUserById(senderId);
        const receiver = await findUserById(receiverId);
        if (!sender || !receiver) {
            res.status(400).json({ message: 'either sender or receiver is invalid' });
            return;
        }
        if (sender.balance < amount) {
            res.status(400).json({ message: 'sender balance is too low' });
            return;
        }
        await User.findOneAndUpdate({ id: senderId }, { balance: sender.balance - amount });
        await User.findOneAndUpdate({ id: receiverId }, { balance: receiver.balance + amount });
        const newTransaction = new Transaction({
            senderId: senderId,
            receiverId: receiverId,
            amount: amount,
            date: Date.now()
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// GET /transactions: Get all transactions info.
router.get('/', async (req, res) => {
    try {
        const allTransactions = await Transaction.find({});
        res.status(200).json(allTransactions);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;