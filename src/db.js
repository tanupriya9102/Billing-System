const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dbURI = 'mongodb://0.0.0.0:27017/billing-system'; // Replace 'billingSystem' with your actual database name

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = { db, app };
