const Reservation = require('../models/reservationModel');
const Guest = require('../models/guestModel');
const { sendEmail } = require('./emailController'); 

const ReservationCreate = async (req, res) => {
    try {
        const { reservationData, guestData } = req.body;

        if (!reservationData) {
            return res.status(400).json({ msg: "Missing reservation data" });
        }

        // If userId is present, create reservation for authenticated user
        if (reservationData.userId) {
            const reservation = await Reservation.create({
                ...reservationData,
                status: 'pending',
            });
            /*Additional logic for sending a confirm email for user*/
            try{
                await sendEmail(
                    reservationData.email,
                    `Reservation Confirmation Message`,
                    `Dear ${reservationData.userId.name},\n\nYour reservation has been successfully created.\n\nReservation Details:\n- Reservation ID: ${reservation._id}\n- Date: ${reservationData.date}\n- Time: ${reservationData.time}\n\nThank you for choosing us!\n\nBest regards,\nYour Company Name`
                )
            }catch (error){
                console.error("Error sending email:", error);
                return res.status(500).json({ msg: "Error sending confirmation email", error: error.message });
            }
            return res.status(201).json({ msg: "User Reservation created successfully", reservation });
        }

        // Handle guest logic
        if (!guestData || !guestData.email) {
            return res.status(400).json({ msg: "Guest data with valid email required" });
        }

        // Check if guest already exists
        let guest = await Guest.findOne({ email: guestData.email });

        if (!guest) {
            guest = await Guest.create(guestData);
            console.log("New guest created:", guest);
        }

        const reservation = await Reservation.create({
            ...reservationData,
            guestId: guest._id,
            status: 'pending',
        });
        /*Additional logic for sending a confirm email for guest*/
        try{
            await sendEmail(
                guestData.email,
                `Reservation Confirmation Message`,
                `Dear ${guestData.name},\n\nYour reservation has been successfully created.\n\nReservation Details:\n- Reservation ID: ${reservation._id}\n- Date: ${reservationData.date}\n- Time: ${reservationData.time}\n\nThank you for choosing us!\n\nBest regards,\nYour Company Name`
            )
        }catch (error){
            console.error("Error sending email:", error);
            return res.status(500).json({ msg: "Error sending confirmation email", error: error.message });
        }
        return res.status(201).json({ msg: "Guest Reservation created successfully", reservation });

    } catch (error) {
        console.error("Reservation creation error:", error);
        res.status(500).json({ msg: "Error creating reservation", error: error.message });
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