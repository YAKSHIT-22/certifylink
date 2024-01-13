const xlsx = require('xlsx');
const excelSchema = require('../models/excelSchema');
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

        // donot delete this
        // const existingdata = await excelSchema.find({
        //     eventsName: jsonData[i]["Event"],
        //     // studentEmail: jsonData[i]["Email"],
        //     // createdBy: req.user
        // })
        // if (!existingdata) {
        //     var oneRow = {
        //         studentName: jsonData[i]["Name"],
        //         studentMobile: jsonData[i]["Mobile"],
        //         studentRoll: jsonData[i]["Roll No"],
        //         eventsName: jsonData[i]["Event"],
        //         studentEmail: jsonData[i]["Email"]
        //     }
        //     arrayToInsert.push(oneRow);
        // }
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
        ExcelData.insertMany(arrayToInsert);
        return res.status(200).json({ message: 'Data saved successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data to Database.' });
    }
}


const getCertificates = async (req, res) => {
    try {
        const data = await excelSchema.find({
            createdBy: req.user
        });
        return res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Error getting data from Database.' });
    }
}

module.exports = {
    createCertificate,
    getCertificates
}