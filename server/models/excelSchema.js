const { default: mongoose } = require("mongoose");

const excelDataSchema = new mongoose.Schema({}, { strict: false });

const ExcelData = mongoose.models["excelData"] || mongoose.model("excelData", excelDataSchema);
module.exports = ExcelData