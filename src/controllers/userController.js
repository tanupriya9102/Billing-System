// controllers/userController.js
const User = require('../models/User');

// In-memory data for users
let users = [];

// User registration API
function createUser(req, res) {
  const { username, email } = req.body;

  if (users.some((user) => user.username === username || user.email === email)) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const newUser = new User(username, email);
  users.push(newUser);
  res.status(201).json(newUser);
}

module.exports = { createUser };
