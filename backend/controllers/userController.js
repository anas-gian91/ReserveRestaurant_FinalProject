const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Declare salt
const saltRound = parseInt(process.env.SALT_ROUNDS,10)||10;

const registerUser = async (req, res)=>{
    try{
        const {username, email, password, Fname, Lname, DateOfBirth, gender, role} = req.body;
        if(!username || !email || !password || !Fname || !Lname ||!DateOfBirth ||!gender){
            return res.status(400).send({msg:"All fields are required"});
        }
        let existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send({msg:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,saltRound);
        await User.create({
            email,
            password: hashedPassword,
            username,
            Fname,
            Lname,
            DateOfBirth,
            gender,
            role:role || 'user',
            status: 'pending'
        })
        res.status(201).send({msg:"User created successfully"});
    }catch(error){
        res.status(500).send({msg: "Error creating user", error: error.message});
    }
}
const approveUser = async (req,res)=>{
    try{
        const {status} = req.body;
        if(!['approved','rejected'].includes(status)){
            return res.status(400).send({msg:"Invalid status. Choose either 'approved' or 'rejected'"});
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {status},
            {new: true}
        );
        if(!user){
            return res.status(404).send({msg:"User not found"});
        }
        res.status(200).send({msg:`User status updated successfully to ${status}`, user});
    }catch(error){
        res.status(500).send({msg: "Error updating user status", error: error.message});
    }
}
const  loginUser = async (req, res) => {
    try{
       const {email, password} = req.body;
       if(!email || !password){
           return res.status(400).send({msg:"All fields are required"});
       }
       let user = await User.findOne({email});
       if(!user){
           return res.status(404).send({msg:"User not found"});
       }
        if(user.status !== 'approved'){
            return res.status(403).send({msg:"Your account is not approved yet. Please wait for admin approval."});
        }
         let isPasswordCorrect = await bcrypt.compare(password, user.password);
         if(!isPasswordCorrect){
              return res.status(400).send({msg:"Invalid credentials"});
         }
         const payload = {
             id: user._id,
             email: user.email,
             role: user.role,
         };
         const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.status(200).send({msg:"Login succesful", token, user: {id: user._id, username: user.username, role: user.role}});   
    }catch(error){
        res.status(500).send({msg: "Error logging in", error: error.message});
    };
};
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password");
        res.status(200).send({msg:"Users fetched successfully", users});
    }catch(error){
        res.status(500).send({msg: "Error fetching users", error: error.message});
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
        res.status(500).send({msg: "Error fetching user", error: error.message});
    }
};
const updateUser = async (req, res) => {
    try{
        const {username,password,Fname,Lname,DateOfBirth,gender,role} = req.body;
        let updateFields = {username,Fname,Lname,DateOfBirth,gender,role};
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
    approveUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};