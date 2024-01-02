const mongoose = require('mongoose')

const templateSchema = new mongoose.Schema({   
    organizationId:{
        type: String,
        required: true,
    },
    organizationName:{
        type: String,
        required: true,
    },
    templateName: {
        type: String,
        required: true
    },
    eventId:{
        type: String,
        required: true
    },
    eventName:{
        type: String,
        required: true
    }
})
const templateData = mongoose.model("templateData", templateSchema);
module.exports = templateData