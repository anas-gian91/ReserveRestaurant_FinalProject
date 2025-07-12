const express = require('express');
const {
  productCreate,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById
} = require('../controllers/menuController');
const {
  ReservationUpdate,
  ReservationDelete,
  ReservationGetById
} = require('../controllers/reservationController');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const {
  updateGuest,
  deleteGuest
} = require('../controllers/guestController');

const { authMiddleware, authRoleMiddleware } = require('../middleware/authMiddle');

const router = express.Router();

// Middleware to allow only admins
router.use(authMiddleware, authRoleMiddleware('admin'));

// 🛒 Product Management
router.post('/products', productCreate);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// 📅 Reservation Management
router.get('/reservations/:id', ReservationGetById);
router.put('/reservations/:id', ReservationUpdate);
router.delete('/reservations/:id', ReservationDelete);

// 👥 User Management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// 👤 Guest Management
router.put('/guests/:id', updateGuest);
router.delete('/guests/:id', deleteGuest);

module.exports = router;