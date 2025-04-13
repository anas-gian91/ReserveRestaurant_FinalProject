const express = require("express");
const { registerUser, loginUser, getUserById, getAllUsers,updateUser,deleteUser} = require("../controllers/userController");
const {authMiddleware} = require("../middleware/authMiddle");
const router = express.Router();

router.get("/Users",authMiddleware, getAllUsers);
router.get("/Users/:id", authMiddleware, getUserById);
router.post("/user/register", registerUser);
router.post("/user/login",loginUser);
router.put("/user/:id",authMiddleware, updateUser);
router.delete("/user/:id",authMiddleware, deleteUser);


module.exports = router;