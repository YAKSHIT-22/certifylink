const xlsx = require('xlsx');
const ExcelData = require('../models/excelSchema');
const createCertificate = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    var arrayToInsert = [];
    for (var i = 0; i < jsonData.length; i++) {
        var oneRow = {
            studentName: jsonData[i]["Name"],
            studentMobile: jsonData[i]["Mobile"],
            studentRoll: jsonData[i]["Roll No"],
            eventsName: jsonData[i]["Event"],
            studentEmail: jsonData[i]["Email"],
            createdBy: req.user
        }
        arrayToInsert.push(oneRow);
    }
    try {
        await ExcelData.deleteMany({
            createdBy: req.user
        })
        await ExcelData.insertMany(arrayToInsert);
        return res.status(200).json({ message: 'Data saved successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data to Database.' });
    }
}


const getCertificates = async (req, res) => {
    try {
        const data = await ExcelData.find({
            createdBy: req.user
        });
        return res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Error getting data from Database.' });
    }
}

const updateCertificates = async (req, res) => {
    try {
        const { studentName, studentEmail, studentMobile, studentRoll, eventsName } = req.body
        await ExcelData.findOneAndUpdate({
            createdBy: req.user,
            _id: req.params.id
        }, {
            $set: {
                studentEmail,
                studentName,
                studentRoll,
                studentMobile,
                eventsName
            }
        }, { new: true });
        return res.status(200).json({ message: "Data Updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const deleteCertificates = async (req, res) => {
    const { id } = req.params;
    try {
        await ExcelData.findByIdAndDelete(id);
        res.status(200).json({
            message: "Certificate Deleted",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    createCertificate,
    getCertificates,
    updateCertificates,
    deleteCertificates
}