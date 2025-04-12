const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{type: String,
        required:true,
    },
    password:{
        type: String,
        required:true
    },
    Fname:{
        type: String,
        required:true
    },
    Lname:{
        type: String,
        required:true
    },
    DateOfBirth:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:true
    },
    role:{
        type: String,
        enum:['admin','user'],
        default:'user'
    },
    status:{
        type: String,
        enum:['pending','approved','rejected'],
        default:'pending'
    },
},{timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;