const mongoose = require('mongoose');
const Organization = require('./organizationSchema');

const templateSchema = new mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
        required: true
    },
    templateName: {
        type: String,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        required: true
    }
})
const Templates = mongoose.models["template"] || mongoose.model("template", templateSchema);
module.exports = Templates