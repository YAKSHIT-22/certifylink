const ejs = require('ejs');
const fs = require('fs');
var Api2Pdf = require('api2pdf');
require('dotenv').config();
var a2pClient = new Api2Pdf(process.env.API_KEY);
const excelSchema = require('../models/excelSchema');
const sendInvoiceMail = require('../config/nodemailer');

const certificate = async (req, res) => {
    try {
        const renderdata = await excelSchema.find();
        const template = fs.readFileSync('views/certificate.ejs', 'utf-8');
        let data = renderdata[0]
        // Render the template with the data
        const renderedCertificate = ejs.render(template, { data });
        fs.writeFileSync('./cert.html', renderedCertificate);
        res.render('certificate', { data });
        const templatePrint = fs.readFileSync("./cert.html", "utf-8");
        a2pClient.wkHtmlToPdf(templatePrint).then(function (result) {
            sendInvoiceMail(data.Email, result.FileUrl)
        });
    }
    catch (error) {
        console.log(error)
    }
}


module.exports = { certificate }