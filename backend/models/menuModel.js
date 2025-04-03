const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    productname:{
        type: String,
        required: true
    },
    productCategory:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productQuantity:{
        type: Number,
        required: true
    },
    productstatus:{
        type: String,
        enum: ['available', 'out of stock'],
        default: 'available'
    },
    orderStatus:{
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending'
    },
    orderBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderDate:{
        type: Date,
        required: true,
        default: Date.now
    },
},
{timestamps: true});