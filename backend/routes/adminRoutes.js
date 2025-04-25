const express = require('express');
const {productCreate, updateProduct, deleteProduct } = require('../controllers/menuController');
const { ReservationUpdate, ReservationDelete } = require('../controllers/reservationController');
const { authMiddleware, authRoleMiddleware } = require('../middleware/authMiddle');
const router = express.Router();

module.exports = router;
