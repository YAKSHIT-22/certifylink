const sendMail = require("../config/nodemailer");
const Certificates = require("../models/certificateSchema");
const Templates = require("../models/templateSchema");
const generateAndUploadPDF = require("../utils/firebase_upload");
const { parse } = require('node-html-parser');

const sendCertificates = async (req, res) => {
  const { template, eventName, organizationName, data } = req.body;
  let length = data.length;
  try {
    if (!template || !eventName || !organizationName) {
      return res.status(400).json({
        message: "Provide all fields",
      });
    }
    if (length === 0) {
      return res.status(400).json({
        message: "Provide atleast one email",
      });
    }
    const temp = await Templates.findOne({ _id: template });

    const dom = parse(temp.templateHtml)
    
    try {
      await data.map(async (item) => {
        //dom.querySelector("#eventName").textContent = eventName;
        dom.querySelector("#organizationName").textContent = organizationName;
        dom.querySelector("#date").textContent = new Date().toLocaleDateString();
        dom.querySelector("#name").textContent = item.studentName;
        const newHtml = dom.toString();

        //firebase upload
        const url = await generateAndUploadPDF(
          newHtml,
          `uploads/${item.studentRoll}_${item.eventsName}.pdf`
        );
        const sent = await sendMail(item, organizationName, url, req.email);
        if (!sent) {
          return res.status(401).json({
            message: "Error sending mails",
          });
        }
      });
    } catch (error) {
      console.log("error", error);
      return res.status(401).json({
        message: "Error sending mails",
      });
    }
    await Certificates.create({
      template,
      eventName,
      organizationName,
      sentBy: req.user,
      number: length,
    });
    return res.status(200).json({
      message: "Mails sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = {
  sendCertificates,
};
