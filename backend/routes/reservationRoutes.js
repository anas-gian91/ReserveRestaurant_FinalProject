const express = require('express');
const {
  ReservationCreate,
  ReservationGetById,
  ReservationGetByUserById,
  ReservationUpdate,
  ReservationDelete,
} = require('../controllers/reservationController');
const router = express.Router();

/*Api for creating a reservation*/
router.post('/reservation/create', ReservationCreate);
/*Api for getting a reservation by id*/
router.get('/reservation/:id', ReservationGetById);
/*Api for getting list of reservations by user id and sorted by date/time*/
router.get('/reservations/user/:id', ReservationGetByUserById);
/*Api for updating a reservation*/
router.put('/reservation/update/:id', ReservationUpdate);
/*Api for deleting a reservation*/
router.delete('/reservation/delete/:id', ReservationDelete);
module.exports = router;