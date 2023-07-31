const User = require('../models/User');

// Create a new user API
async function createUser(req, res) {
  const { username, email } = req.body;

  try {
    const user = new User({ username, email });
    await user.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
}

module.exports = { createUser, getAllUsers };
