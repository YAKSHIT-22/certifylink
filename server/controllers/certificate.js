// const ejs = require('ejs');
// const fs = require('fs');
// var Api2Pdf = require('api2pdf');
// require('dotenv').config();
// var a2pClient = new Api2Pdf(process.env.API_KEY);
// const excelSchema = require('../models/excelSchema');
// const sendInvoiceMail = require('../config/nodemailer');

// const certificate = async (req, res) => {
//     try {
//         const renderdata = await excelSchema.find();
//         const template = fs.readFileSync('views/certificate.ejs', 'utf-8');
//         let data = renderdata[0]
//         // Render the template with the data
//         const renderedCertificate = ejs.render(template, { data });
//         fs.writeFileSync('./cert.html', renderedCertificate);
//         res.render('certificate', { data });
//         const templatePrint = fs.readFileSync("./cert.html", "utf-8");
//         a2pClient.wkHtmlToPdf(templatePrint).then(function (result) {
//             sendInvoiceMail(data.Email, result.FileUrl)
//         });
//     }
//     catch (error) {
//         console.log(error)
//     }
// }


// module.exports = { certificate }


const xlsx = require('xlsx');
const excelSchema = require('../models/excelSchema');
const createCertificate = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    try {
        jsonData.map(async (data) => {
            const newData = {
                ...data,
                createdBy: req.user
            }
            const existingdata = await excelSchema.find({
                RollNo: newData.RollNo,
                createdBy: req.user
            })
            if (existingdata && existingdata.length > 0) {
                return;
            }
            const newExcelData = new excelSchema(newData);
            await newExcelData.save();
        })
    } catch (error) {
        res.status(500).json({ message: 'Error saving data to Database.' });
    }
}


const getCertificates = async (req, res) => {
    try {
        const data = await excelSchema.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error getting data from Database.' });
    }
}

module.exports = {
    createCertificate,
    getCertificates
}