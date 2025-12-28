const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const saltRound = parseInt(process.env.SALT_ROUNDS, 10) || 10;

// Get all users with filters
const getAllUsersAdmin = async (req, res) => {
    try {
        const { status, role, gender } = req.query;
        
        // Build filter object
        let filter = {};
        if (status) filter.status = status;
        if (role) filter.role = role;
        if (gender) filter.gender = gender;

        const users = await User.find(filter).select("-password").sort({ createdAt: -1 });
        
        res.status(200).send({
            msg: "Users fetched successfully",
            count: users.length,
            users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ msg: "Error fetching users", error: error.message });
    }
};

// Get pending users
const getPendingUsers = async (req, res) => {
    try {
        const pendingUsers = await User.find({ status: 'pending' })
            .select("-password")
            .sort({ createdAt: -1 });
        
        res.status(200).send({
            msg: "Pending users fetched successfully",
            count: pendingUsers.length,
            users: pendingUsers
        });
    } catch (error) {
        console.error("Error fetching pending users:", error);
        res.status(500).send({ msg: "Error fetching pending users", error: error.message });
    }
};

// Approve or reject user
const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).send({ msg: "Status must be 'approved', 'rejected', or 'pending'" });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        res.status(200).send({
            msg: `User status updated to ${status}`,
            user
        });
    } catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).send({ msg: "Error updating user status", error: error.message });
    }
};

// Update user role
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Validate role
        if (!['admin', 'user'].includes(role)) {
            return res.status(400).send({ msg: "Role must be 'admin' or 'user'" });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        res.status(200).send({
            msg: `User role updated to ${role}`,
            user
        });
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).send({ msg: "Error updating user role", error: error.message });
    }
};

// Update any user (admin privilege)
const updateUserAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, Fname, Lname, DateOfBirth, phone, gender, status, role } = req.body;

        let updateFields = {};
        
        // Only add fields that are provided
        if (username) updateFields.username = username;
        if (Fname) updateFields.Fname = Fname;
        if (Lname) updateFields.Lname = Lname;
        if (DateOfBirth) updateFields.DateOfBirth = new Date(DateOfBirth);
        if (phone) updateFields.phone = phone;
        if (gender) updateFields.gender = gender;
        if (status) updateFields.status = status;
        if (role) updateFields.role = role;
        
        // Hash password if provided
        if (password) {
            updateFields.password = await bcrypt.hash(password, saltRound);
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).send({ msg: "User not found" });
        }

        res.status(200).send({
            msg: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ msg: "Error updating user", error: error.message });
    }
};

// Delete user (admin privilege)
const deleteUserAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        // Prevent admin from deleting themselves
        if (user._id.toString() === req.user.id) {
            return res.status(400).send({ msg: "Cannot delete your own account" });
        }

        await User.findByIdAndDelete(id);
        
        res.status(200).send({
            msg: "User deleted successfully",
            deletedUser: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ msg: "Error deleting user", error: error.message });
    }
};

// Get system statistics
const getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const pendingUsers = await User.countDocuments({ status: 'pending' });
        const approvedUsers = await User.countDocuments({ status: 'approved' });
        const rejectedUsers = await User.countDocuments({ status: 'rejected' });
        const adminUsers = await User.countDocuments({ role: 'admin' });
        const regularUsers = await User.countDocuments({ role: 'user' });

        res.status(200).send({
            msg: "System statistics fetched successfully",
            stats: {
                totalUsers,
                usersByStatus: {
                    pending: pendingUsers,
                    approved: approvedUsers,
                    rejected: rejectedUsers
                },
                usersByRole: {
                    admin: adminUsers,
                    user: regularUsers
                }
            }
        });
    } catch (error) {
        console.error("Error fetching system stats:", error);
        res.status(500).send({ msg: "Error fetching system statistics", error: error.message });
    }
};

// Bulk approve users
const bulkApproveUsers = async (req, res) => {
    try {
        const { userIds } = req.body;

        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).send({ msg: "userIds must be a non-empty array" });
        }

        const result = await User.updateMany(
            { _id: { $in: userIds } },
            { status: 'approved' }
        );

        res.status(200).send({
            msg: "Users approved successfully",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error("Error bulk approving users:", error);
        res.status(500).send({ msg: "Error bulk approving users", error: error.message });
    }
};

// Search users
const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).send({ msg: "Search query is required" });
        }

        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { Fname: { $regex: query, $options: 'i' } },
                { Lname: { $regex: query, $options: 'i' } }
            ]
        }).select("-password").limit(20);

        res.status(200).send({
            msg: "Search completed successfully",
            count: users.length,
            users
        });
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).send({ msg: "Error searching users", error: error.message });
    }
};

module.exports = {
    getAllUsersAdmin,
    getPendingUsers,
    updateUserStatus,
    updateUserRole,
    updateUserAdmin,
    deleteUserAdmin,
    getSystemStats,
    bulkApproveUsers,
    searchUsers
};