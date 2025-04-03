const express = require("express");
const { registerUser, loginUser, getUserById, getAllUsers,updateUser,deleteUser} = require("../controllers/userController");
const {authMiddleware, authRoleMiddleware} = require("../middleware/authMiddle");
const router = express.Router();

router.get("/Users",authMiddleware, authRoleMiddleware(['admin','editor','user']), getAllUsers);
router.get("/Users/:id", authMiddleware, getUserById);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.put("/user/Users/:id",authMiddleware,authRoleMiddleware(['admin']), updateUser);
router.delete("/user/Users/:id",authMiddleware,authRoleMiddleware(['admin']), deleteUser);

module.exports = router;