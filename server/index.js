const express = require('express');
const users = require('./routes/user.route');
const transactions = require('./routes/transaction.route');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_ATLAS_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());
app.use('/api/users', users);
app.use('/api/transactions', transactions);

app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

module.exports = {app, server};