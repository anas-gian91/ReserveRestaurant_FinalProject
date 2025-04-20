const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productStatus: {
        type: String,
        enum: ['available', 'out of stock'],
        default: 'available'
    }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
