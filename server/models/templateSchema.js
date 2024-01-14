const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    templateName: {
        type: String,
        required: true
    },
    templateImage: {
        type: String,
        required: true
    },
    templateHtml: {
        type: String,
        required: true
    }
})
const Templates = mongoose.models["template"] || mongoose.model("template", templateSchema);
module.exports = Templates