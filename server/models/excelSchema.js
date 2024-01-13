const { default: mongoose } = require("mongoose");

const excelDataSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentMobile: {
        type: String,
        required: true
    },
    studentRoll: {
        type: String,
        required: true
    },
    eventsName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    strict: false, timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

const ExcelData = mongoose.models["excelData"] || mongoose.model("excelData", excelDataSchema);
module.exports = ExcelData