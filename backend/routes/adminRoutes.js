const express = require('express');
const router = express.Router();
const { authMiddleware, authRoleMiddleware } = require('../middleware/authMiddle');
const {
    getAllUsersAdmin,
    getPendingUsers,
    updateUserStatus,
    updateUserRole,
    updateUserAdmin,
    deleteUserAdmin,
    getSystemStats,
    bulkApproveUsers,
    searchUsers
} = require('../controllers/adminController');

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(authRoleMiddleware(['admin']));

// Get all users with optional filters (?status=pending&role=user)
router.get('/users', getAllUsersAdmin);

// Get pending users
router.get('/users/pending', getPendingUsers);

// Search users (?query=john)
router.get('/users/search', searchUsers);

// Get system statistics
router.get('/stats', getSystemStats);

// Update user status (approve/reject)
router.patch('/users/:id/status', updateUserStatus);

// Update user role
router.patch('/users/:id/role', updateUserRole);

// Update user (full update)
router.put('/users/:id', updateUserAdmin);

// Delete user
router.delete('/users/:id', deleteUserAdmin);

// Bulk approve users
router.post('/users/bulk-approve', bulkApproveUsers);

module.exports = router;