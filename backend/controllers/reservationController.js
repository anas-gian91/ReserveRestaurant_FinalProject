const Reservation = require('../models/reservationModel');
const Guest = require('../models/guestModel');
const ReservationCreate = async (req, res) => {
    try{
        const {
            email,
            Fname,
            Lname,
            DateOfBirth,
            phone,
            gender,
            reservationDate,
            reservationTime,
            numberOfPeople,
            place_category,
            noOfTable
        } = req.body;

        let reservationData = {
            reservationDate,
            reservationTime,
            numberOfPeople,
            place_category,
            noOfTable,
            status: 'pending',
        };

        if (req.user && req.user._id) {
            // Authenticated user
            reservationData.userId = req.user._id;
        } else {
            // Guest
            if (!email || !Fname || !Lname || !DateOfBirth || !phone || !gender) {
                return res.status(400).json({ msg: "All guest fields are required." });
            }

            let guest = await Guest.findOne({ email });

            if (!guest) {
                guest = await Guest.create({
                    email,
                    Fname,
                    Lname,
                    DateOfBirth,
                    phone,
                    gender,
                });
            }

            reservationData.guestId = guest._id;
        }

        const reservation = await Reservation.create(reservationData);
        res.status(201).json({ msg: "Reservation created successfully", reservation });
    } catch (error) {
        console.error("Reservation creation error:", error.message);
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