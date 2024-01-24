const mongoose = require('mongoose');

const userSchema = { id: Number, balance: Number };

const User = mongoose.model('User', userSchema);

module.exports = User;
