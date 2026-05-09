const express = require("express");

const router = express.Router();

const {
    getUserBookings,
    getAllBookings
} = require("../controllers/bookingController");

const Booking = require("../models/Booking");

const QRCode = require("qrcode");

router.post("/create", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        const qrData = `
Event: ${req.body.event}
Participants: ${req.body.participants}
Amount Paid: ₹${req.body.totalAmount}
Status: Confirmed
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

router.get("/", getAllBookings);

module.exports = router;