const express = require('express')
const router = express.Router()
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    getSingleTextAns,
    updateTextAns,
    updateQuestAns,
    getDailyTextAns,
    processUserTexts
} = require('../controllers/userController')

// Specific routes for text answers should come before general user routes
// Get or create text answer by date for a specific user
router.get('/:id/processTexts', async (req, res) => {
    try {
        const userId = req.params.id;  // Change from userId to id based on your route setup
        const result = await processUserTexts(userId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.get('/:id/getDailyTextAns/:date', getDailyTextAns);
router.post('/:id/textAns/:date', updateTextAns);  // POST handler for updating text answers
router.get('/:id/textAns/:date', getSingleTextAns);  // GET handler for retrieving text answers
router.patch('/:id/questAns/:date', updateQuestAns);  // POST handler for updating questionnaire answers

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
