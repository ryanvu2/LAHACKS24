const express = require('express')
const router = express.Router()
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    getSingleTextAns,
    updateTextAns
} = require('../controllers/userController')

// Specific routes for text answers should come before general user routes
// Get or create text answer by date for a specific user
router.post('/:id/textAns/:date', updateTextAns);  // POST handler for updating text answers
router.get('/:id/textAns/:date', getSingleTextAns);  // GET handler for retrieving text answers

// General user routes
// Get all users
router.get('/', getUsers);

// Get single user
router.get('/:id', getUser);

// Create a user
router.post('/', createUser);

// Delete a user
router.delete('/:id', deleteUser);

// Update a user
router.patch('/:id', updateUser);

module.exports = router;
