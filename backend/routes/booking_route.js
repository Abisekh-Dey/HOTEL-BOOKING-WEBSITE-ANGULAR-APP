const express = require("express");
const bookingController = require("../controller/booking_controller");
const { check } = require("express-validator");

const router = express.Router();

router.post("/booking",[check('userId').notEmpty(),check('roomId').notEmpty(),check('checkInDate').notEmpty(),check('checkOutDate').notEmpty(),check('guests').isArray()], bookingController.createBooking);
router.get("/booking/:userId", bookingController.getBookingsByUser);
router.get('/bookings', bookingController.getAllBookings);
router.patch("/booking/:bid", bookingController.updateBooking);
router.delete("/booking/:bid", bookingController.deleteBooking);

module.exports = router;
