const Reservation = require('../models/reservationModel');

const ReservationCreate = async (req, res) => {
    try{
        const reservation = await Reservation.create(req.body);
        res.status(201).send(reservation);
    }catch (error){
        res.status(400).send({ msg: "Error creating reservation", error: error.message });
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