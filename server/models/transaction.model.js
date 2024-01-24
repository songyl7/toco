const mongoose = require('mongoose');

const transactionSchema = { senderId: Number, receiverId: Number, amount: Number, date: Date };

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
