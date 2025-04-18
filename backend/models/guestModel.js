const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    email:{type: String,
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
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:true
    },
},
    {timestamps: true}
);

const Guest = mongoose.model('Guest',guestSchema);
module.exports = Guest;