const express = require("express");
const { registerUser, loginUser, getUserById, getPendingUsers, approveUser, getAllUsers,updateUser,deleteUser} = require("../controllers/userController");
const {authMiddleware, authRoleMiddleware, checkUserStatus} = require("../middleware/authMiddle");
const router = express.Router();

router.get("/Users",authMiddleware,checkUserStatus, getAllUsers);
router.get("/Users/:id", authMiddleware,checkUserStatus, getUserById);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.put("/user/Users/:id",authMiddleware,checkUserStatus, updateUser);
router.delete("/user/Users/:id",authMiddleware,checkUserStatus, deleteUser);
router.put("/user/verify/:id", authMiddleware,checkUserStatus, authRoleMiddleware(["admin"]),approveUser);
router.get("/user/pending", authMiddleware,checkUserStatus, authRoleMiddleware(["admin"]),getPendingUsers);

module.exports = router;