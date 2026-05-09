const Event = require("../models/Event");

const createEvent = async (req, res) => {

    try {

        const {
            title,
            description,
            date,
            location,
            ticketPrice,
            organizer
        } = req.body;

        const event = await Event.create({
            title,
            description,
            date,
            location,
            ticketPrice,
            organizer
        });

        res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getAllEvents = async (req, res) => {

    try {

        const events = await Event.find().populate("organizer");

        res.status(200).json(events);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const updateEvent = async (req, res) => {

    try {

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedEvent);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteEvent = async (req, res) => {

    try {

        await Event.findByIdAndDelete(req.params.id);

        res.json({
            message: "Event deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
};