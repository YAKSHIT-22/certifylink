const sendMail = require('../config/nodemailer');
const Certificates = require('../models/certificateSchema');
const Templates = require('../models/templateSchema');
const generateAndUploadPDF = require('../utils/firebase_upload');

const sendCertificates = async (req, res) => {
    const {
        template,
        eventName,
        organizationName,
        data
    } = req.body;
    let length = data.length;
    try {
        if (!template || !eventName || !organizationName) {
            return res.status(400).json({
                message: "Provide all fields"
            })
        }
        if (length === 0) {
            return res.status(400).json({
                message: "Provide atleast one email"
            })
        }
        const temp = await Templates.findOne({ _id: template })
        try {
            await data.map(async (item) => {
                //firebase upload
                const url = await generateAndUploadPDF(temp.templateHtml, `uploads/${item.studentRoll}_${item.eventsName}.pdf`);
                await sendMail(item, organizationName, url, req.email)
            })
        }
        catch (error) {
            console.log("error", error)
            return res.status(401).json({
                message: "Error sending mails"
            })
        }
        await Certificates.create({
            template,
            eventName,
            organizationName,
            sentBy: req.user,
            number: length
        });
        return res.status(200).json({
            message: "Mails sent successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
module.exports = {
    sendCertificates
}