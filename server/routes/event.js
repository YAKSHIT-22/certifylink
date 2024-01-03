const express = require("express");
const { verifyAuth } = require("../middleware/auth.js");
const { createEvent, getEvent, updateEvent, deleteEvent } = require("../controllers/events.js");
const authRouter = express.Router();

authRouter.post("/", verifyAuth, createEvent);
authRouter.get("/", verifyAuth, getEvent);
authRouter.put("/:id", verifyAuth, updateEvent);
authRouter.delete("/:id", verifyAuth, deleteEvent);

module.exports = authRouter;