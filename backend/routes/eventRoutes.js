const express = require("express");

const router = express.Router();

const {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController");

router.post("/create", createEvent);

router.get("/", getAllEvents);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;