const { default: mongoose } = require("mongoose");

const excelDataSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: String
    },
    studentMobile: {
        type: String,
        required: String
    },
    studentRoll: {
        type: String,
        required: String
    },
    eventsName: {
        type: String,
        required: String
    },
}, {
    strict: false, timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

const ExcelData = mongoose.models["excelData"] || mongoose.model("excelData", excelDataSchema);
module.exports = ExcelData