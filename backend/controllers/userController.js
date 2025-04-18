const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Declare salt
const saltRound = parseInt(process.env.SALT_ROUNDS,10)||10;

const registerUser = async (req, res) => {
    console.log("Incoming register body:", req.body); // Logging incoming request
    
    try {
        const { username, email, password, Fname, Lname, DateOfBirth, phone, gender, role } = req.body;

        // Validation checks
        if (!username || !email || !password || !Fname || !Lname || !DateOfBirth ||phone || !gender) {
            return res.status(400).send({ msg: "All fields are required" });
        }

        // Ensure DateOfBirth is a valid Date format
        const dateOfBirth = new Date(DateOfBirth);
        if (isNaN(dateOfBirth)) {
            return res.status(400).send({ msg: "Invalid DateOfBirth format" });
        }

        // Ensure gender is valid (either 'Male' or 'Female')
        if (!['Male', 'Female'].includes(gender)) {
            return res.status(400).send({ msg: "Gender must be 'Male' or 'Female'" });
        }

        // Ensure role is valid (either 'admin' or 'user')
        if (role && !['admin', 'user'].includes(role)) {
            return res.status(400).send({ msg: "Role must be 'admin' or 'user'" });
        }

        // Check if the user already exists by email
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ msg: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRound);

        // Create the new user
        await User.create({
            email,
            password: hashedPassword,
            username,
            Fname,
            Lname,
            DateOfBirth: dateOfBirth,
            phone,
            gender,
            role: role || 'user', // Default to 'user' if no role provided
            status: 'pending'
        });

        res.status(201).send({ msg: "User created successfully" });
    } catch (error) {
        console.error("Register error:", error); // Log error for debugging
        res.status(500).send({ msg: "Error creating user", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        // Validate input
        if (!emailOrUsername || !password) {
            return res.status(400).send({ msg: "All fields are required" });
        }

        // Find user by email or username
        let user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });

        // If user is not found
        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        // Compare passwords
        let isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send({ msg: "Invalid credentials" });
        }

        // Create JWT payload
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        // Sign the JWT token
        let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Send response with token and user details
        res.status(200).send({
            msg: "Login successful",
            token,
            user: { id: user._id, username: user.username, role: user.role }
        });
    } catch (error) {
        console.error("Login error:", error); // Log error for debugging
        res.status(500).send({ msg: "Error logging in", error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password");
        res.status(200).send({msg:"Users fetched successfully", users});
    }catch(error){
        res.status(500).send({msg: "Error fetching users"});
    }
};
const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select("-password");
        if(!user){
            return res.status(404).send({msg:"User not found"});
        }
        res.status(200).send({msg:"User fetched successfully", user});
    }catch(error){
        res.status(500).send({msg: "Error fetching user"});
    }
};
const updateUser = async (req, res) => {
    try{
        const {username,password,Fname,Lname,DateOfBirth,phone,gender,status} = req.body;
        let updateFields = {username,Fname,Lname,DateOfBirth,phone,gender,status};
        if(password){
            updateFields.password = await bcrypt.hash(password, saltRound);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateFields,
            {new: true, runValidators: true}
        )
        if(!updatedUser){
            return res.status(404).send({msg:"User not found"});
        }
        res.status(200).send({msg:"User updated successfully", user:updatedUser});
    }catch(error){
        res.status(500).send({msg: "Error updating user", error: error.message});
    }
};
const deleteUser = async (req, res)=> {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).send({msg:"User not found"});
        }
        await User.findByIdAndDelete(userId);
        res.status(200).send({msg:"User deleted successfully"});
    }catch(error){
        res.status(500).send({msg: "Error deleting user", error: error.message});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};