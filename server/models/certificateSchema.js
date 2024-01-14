const mongoose = require('mongoose')

const certificateSchema = new mongoose.Schema({
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "template",
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    organizationName: {
        type: String,
        required: true
    },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    number: {
        type: Number,
        required: true
    }
})
const Certificates = mongoose.models["certificate"] || mongoose.model("certificate", certificateSchema);
module.exports = Certificates