const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default:null
    },
    guestId: { type: mongoose.Schema.Types.ObjectId, 
        ref: "Guest", 
        default: null },
    reservationDate:{
     type: Date,
     required:true   
    },
    reservationTime:{
        type: String,
        required:true
    },
    numberOfPeople:{
        type: Number,
        required:true
    },
    place_category:{
        type: String,
        required:true
    },
    noOfTable:{
        type: Number,
        required:true
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending'
    },
}, 
{timestamps: true});
const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;