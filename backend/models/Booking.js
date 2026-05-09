const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },

    qrCode: {
        type: String
    },

    attended: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);