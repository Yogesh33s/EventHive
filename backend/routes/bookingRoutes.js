const express = require("express");

const router = express.Router();

const {
    createBooking
} = require("../controllers/bookingController");

const {
    getUserBookings
} = require("../controllers/bookingController");

const Booking = require("../models/Booking");

const QRCode = require("qrcode");

router.post("/create", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        const qrData = `
            User: ${req.body.user}
            Event: ${req.body.event}
        `;

        const qrCode = await QRCode.toDataURL(qrData);

        booking.qrCode = qrCode;

        await booking.save();

        res.status(201).json({
            message: "Booking successful",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.get("/user/:userId", getUserBookings);

module.exports = router;