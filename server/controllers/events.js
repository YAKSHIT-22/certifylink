const Events = require("../models/eventSchema");

const createEvent = async (req, res) => {
    const { eventName, address, type, startDate, endDate } = req.body;
    if (!eventName || !address || !type || !startDate || !endDate) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    const existingEvent = await Events.findOne({ eventName: eventName })
    if (existingEvent) {
        return res.status(400).json({
            success: false,
            message: "Event Already Exists"
        })
    }
    try {
        await (new Events({
            eventName,
            address, type, startDate, endDate,
            createdBy: req.user
        })).save();
        const data = await Events.find({ createdBy: req.user })
        res.status(200).json({
            message: "Event created",
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getEvent = async (req, res) => {
    const id = req.user;
    try {
        const event = await Events.find({ createdBy: id })
        res.status(200).json({
            message: "event fetched",
            data: event
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { eventName, address, type, startDate, endDate } = req.body;
    try {
        let data = await Events.findByIdAndUpdate(id, {
            $set: {
                eventName,
                address, type, startDate, endDate
            }
        }, { new: true });
        res.status(200).json({
            message: "Event updated",
            data
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await Events.findByIdAndDelete(id);
        res.status(200).json({
            message: "Event Deleted",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
}