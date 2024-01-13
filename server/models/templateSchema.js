const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
    },
    templateName: {
        type: String,
        required: true
    },
    templateImage: {
        type: String,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
    }
})
const Templates = mongoose.models["template"] || mongoose.model("template", templateSchema);
module.exports = Templates