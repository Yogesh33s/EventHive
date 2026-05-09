const express = require("express");

const router = express.Router();

const {
    createBooking,
    getUserBookings,
    getAllBookings
} = require("../controllers/bookingController");

router.post("/create", createBooking);

router.get("/user/:userId", getUserBookings);

router.get("/all", getAllBookings);

module.exports = router;