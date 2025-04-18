const express = require('express');
const {
    createGuest,
    getGuestById,
    updateGuest,
    deleteGuest
} = require('../controllers/guestController');
const router = express.Router();

router.post('/guests', createGuest); // Create a new guest
router.get('/guests/:id', getGuestById); // Get a guest by ID
router.put('/guests/:id', updateGuest); // Update a guest by ID
router.delete('/guests/:id', deleteGuest); // Delete a guest by ID

module.exports = router;