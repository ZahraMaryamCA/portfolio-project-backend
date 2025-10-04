const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route: /api/users
router
  .route('/')
  .get(userController.getAllUsers)      // GET all users
  .post(userController.createUser)       // POST new user
  .delete(userController.deleteAllUsers); // DELETE all users

// Route: /api/users/:id
router
  .route('/:id')
  .get(userController.getUserById)    // GET user by ID
  .put(userController.updateUser)      // PUT update user
  .delete(userController.deleteUser);  // DELETE user by ID

module.exports = router;
