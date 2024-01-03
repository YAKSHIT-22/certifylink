const mongoose = require('mongoose');
const User = require("./userSchema")

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

const Events = mongoose.models["event"] || mongoose.model("event", eventSchema);
module.exports = Events
