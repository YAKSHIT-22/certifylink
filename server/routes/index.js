
const xlsx = require('xlsx');
const excelSchema = require('../models/excelSchema');
const postData = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    try {
        jsonData.map(async (data) => {
            const newExcelData = new excelSchema(data);
            await newExcelData.save();
        })
        res.send('<h1>Excel data saved successfully!</h1>');
    } catch (error) {
        res.status(500).send('Error saving data to MongoDB.');
    }
}
module.exports = {
    postData
}