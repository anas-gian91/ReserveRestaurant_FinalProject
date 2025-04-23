const Reservation = require('../models/reservationModel');
const Guest = require('../models/guestModel');
const ReservationCreate = async (req, res) => {
    let guestData;
    try{
     
       
        if(req.body.guestData !== undefined){
           guestData = {
                email: req.body.guestData.email ||null,
                Fname: req.body.guestData.Fname||null,
                Lname: req.body.guestData.Lname||null,
                DateOfBirth: req.body.guestData.DateOfBirth||null,
                phone: req.body.guestData.phone||null,
                gender: req.body.guestData.gender||null,
            }
console.log("Guest data:", guestData);  
        }
          
        let reservationData = {
            reservationDate:req.body.reservationData.reservationDate,
            reservationTime:req.body.reservationData.reservationTime,
            numberOfPeople:req.body.reservationData.numberOfPeople,
            place_category:req.body.reservationData.place_category,
            noOfTable:req.body.reservationData.noOfTable,
            userId: req.body.reservationData.userId || null,
            guestId: req.body.reservationData.guestId || null,
            status: 'pending',
        } 

        if (req.body.reservationData.userId && req.body.reservationData.userId !== null) {
            reservationData.userId = req.body.reservationData.userId; // Authenticated user ID  
            // Authenticated user
           await Reservation.create(reservationData);
            return res.status(201).json({ msg: "User Reservation created successfully" });
        } else {
            console.log("Guest reservation data:", guestData);
            // Guest reservation

            let guest = await Guest.findOne({ email: guestData.email });
            if (!guest) {
                guest = await Guest.create(guestData);
                console.log("Guest created:", guest);
                reservationData.guestId = guest._id;
                const reservation = await Reservation.create({...reservationData,guestId:guest._id});
                res.status(201).json({ msg: "Guest Reservation created successfully", reservation });
            }
    
          
        }
   
    } catch (error) {
        console.error("Reservation creation error:", error);
        res.status(400).json({ msg: "Error creating reservation", error: error.message });
    }
};
const ReservationGetById = async (req, res) => {
    try{
        const reservation = await Reservation.findById(req.params.id).populate('userId');
        if (!reservation) {
            return res.status(404).send({ msg: "Reservation not found" });
        }
        res.status(200).send(reservation);
    }
    catch (error){
        res.status(500).send({ msg: "Error fetching reservation", error: error.message });
    }
};
const ReservationUpdate = async (req, res) => {
    try{
        const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true ,runValidators: true});
        if (!updated) {
            return res.status(404).send({ msg: "Reservation not found" });
        }
        res.status(200).send(updated);
    }
    catch (error){
        res.status(400).send({ msg: "Error updating reservation", error: error.message });
    }
};
const ReservationDelete = async (req, res) => {
    try{const deleted = await Reservation.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).send({ msg: "Reservation not found" });
        }
        res.status(200).send({ msg: "Reservation deleted successfully" });
    }
    catch (error){
        res.status(500).send({ msg: "Error deleting reservation", error: error.message });
    }
};

module.exports = {
    ReservationCreate,
    ReservationGetById,
    ReservationUpdate,
    ReservationDelete
};