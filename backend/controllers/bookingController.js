const Booking = require("../models/Booking");
const QRCode = require("qrcode");

const createBooking = async (req, res) => {

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

};

const getUserBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.params.userId
        }).populate("event");

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createBooking,
    getUserBookings
};