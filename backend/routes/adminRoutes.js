const express = require('express');
const {productCreate, updateProduct, deleteProduct } = require('../controllers/menuController');
const { ReservationUpdate, ReservationDelete } = require('../controllers/reservationController');
const { authMiddleware, authRoleMiddleware } = require('../middleware/authMiddle');
const router = express.Router();

// Corrected order: authMiddleware and authRoleMiddleware should come before controllers
router.post('/menu/create', authMiddleware, authRoleMiddleware(['admin','user']), productCreate);
router.put('/menu/update/:id', authMiddleware, authRoleMiddleware(['admin']), updateProduct);
router.delete('/menu/delete/:id', authMiddleware, authRoleMiddleware(['admin']), deleteProduct);
router.put('/reservation/update/:id', authMiddleware, authRoleMiddleware(['admin']), ReservationUpdate);
router.delete('/reservation/delete/:id', authMiddleware, authRoleMiddleware(['admin']), ReservationDelete);

module.exports = router;
