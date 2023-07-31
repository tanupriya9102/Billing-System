const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for creating a new user
router.post('/user', userController.createUser);
router.get('/user', userController.getAllUsers);

module.exports = router;
